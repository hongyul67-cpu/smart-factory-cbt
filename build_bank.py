# -*- coding: utf-8 -*-
"""_작업/스마트공장 전사/_src/문항/*.json  →  data/bank.js (도구가 읽는 문제은행)

    python build_bank.py

전사 세션이 만든 JSON 16개를 도구가 바로 쓰는 한 파일로 굽는다.
칸 이름을 짧게 줄이는 이유 — 1,207문항이라 이름 길이가 그대로 파일 크기다.

  i 아이디 · c 챕터 · s 절 · p 책 쪽 · q 발문 · o 보기4 · a 정답(0부터)
  e 해설 · d 중복이면 먼저 나온 아이디 · f 그림 · x 1이면 보기를 섞지 말 것

x 를 두는 이유: 해설이 "①, ③, ④는 …" 처럼 보기 번호를 가리키면
보기를 섞는 순간 해설이 엉뚱한 보기를 가리킨다(검수보고 8번 칸 2항).

검수용 칸(reviewNote·answerSource·whyNote·note)은 화면에 안 내보낸다(검수보고 8번 칸 3항).
"""
import io, os, re, json, sys, glob, datetime

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
HERE = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(HERE, "..", "_작업", "스마트공장 전사", "_src", "문항")
OUT  = os.path.join(HERE, "data", "bank.js")

NUMMARK = re.compile(r"[①②③④]")


def row(it, ch, sec):
    """JSON 문항 하나 → 도구가 읽는 짧은 칸"""
    o = it["choices"]
    assert len(o) == 4, (it["id"], "보기가 4개가 아님")
    a = it["answer"] - 1                       # 책은 1부터, 도구는 0부터
    assert 0 <= a <= 3, (it["id"], "정답 번호 이상")
    r = {"i": it["id"], "c": ch, "s": sec, "p": it["page"],
         "q": it["q"], "o": o, "a": a, "e": it.get("why", "")}
    if it.get("dupOf"):
        r["d"] = it["dupOf"]
    if it.get("fig"):
        r["f"] = it["fig"]
    if NUMMARK.search(r["q"] + " " + r["e"]):
        r["x"] = 1
    return r


def main():
    chapters, bank, exams = [], [], []

    for f in sorted(glob.glob(os.path.join(SRC, "ch*.json"))):
        d = json.load(io.open(f, encoding="utf-8"))
        ch = d["chapter"]
        secs = []
        for si, s in enumerate(d["sets"], 1):
            for it in s["items"]:
                bank.append(row(it, ch, si))
            secs.append({"s": si, "t": s["section"], "p": s["pages"],
                         "n": len(s["items"])})
        chapters.append({"c": ch, "t": d["chapterTitle"], "secs": secs})

    for f in sorted(glob.glob(os.path.join(SRC, "cbt*.json"))):
        d = json.load(io.open(f, encoding="utf-8"))
        n = int(re.sub(r"\D", "", d["chapter"]))
        items = [row(it, "cbt%d" % n, 0)
                 for s in d["sets"] for it in s["items"]]
        assert len(items) == 60, (f, len(items))
        exams.append({"n": n, "t": d["chapterTitle"],
                      "p": d["sets"][0]["pages"], "items": items})

    # ── 나가기 전에 한 번 더 센다 ───────────────────────────────
    ids = [r["i"] for r in bank] + [r["i"] for e in exams for r in e["items"]]
    assert len(ids) == len(set(ids)), "아이디가 겹칩니다"
    dup = sum(1 for r in bank if "d" in r) + \
          sum(1 for e in exams for r in e["items"] if "d" in r)
    nox = sum(1 for r in bank if "x" in r)

    def dump(v):
        return json.dumps(v, ensure_ascii=False, separators=(",", ":"))

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with io.open(OUT, "w", encoding="utf-8") as w:
        w.write("/* 스마트공장기능사 필기 — 문제은행 (자동 생성, 손으로 고치지 마세요)\n")
        w.write("   만든 날 %s · build_bank.py 가 _src/문항/*.json 에서 구움\n" % datetime.date.today())
        w.write("   예상문제 %d · CBT %d = %d문항 (중복표시 %d · 보기섞기 제외 %d)\n"
                % (len(bank), sum(len(e["items"]) for e in exams),
                   len(ids), dup, nox))
        w.write("   ⚠ 시중 교재 문항입니다. 평문 그대로 공개 저장소에 올리지 마세요. */\n")
        w.write("window.SF_BUILT=%s;\n" % dump(str(datetime.date.today())))
        w.write("window.SF_CH=%s;\n" % dump(chapters))
        w.write("window.SF_BANK=[\n")
        w.write(",\n".join(dump(r) for r in bank))
        w.write("\n];\n")
        w.write("window.SF_EXAMS=[\n")
        for i, e in enumerate(exams):
            head = {k: e[k] for k in ("n", "t", "p")}
            w.write('{"n":%d,"t":%s,"p":%s,"items":[\n' % (e["n"], dump(e["t"]), dump(e["p"])))
            w.write(",\n".join(dump(r) for r in e["items"]))
            w.write("\n]}" + ("," if i < len(exams) - 1 else "") + "\n")
        w.write("];\n")

    kb = os.path.getsize(OUT) / 1024
    print("  ✔ %s" % OUT)
    print("     예상문제 %d · CBT %d회 %d · 합 %d문항 · %.0f KB"
          % (len(bank), len(exams), sum(len(e["items"]) for e in exams), len(ids), kb))
    print("     중복(dupOf) %d · 보기섞기 제외 %d · 챕터 %d" % (dup, nox, len(chapters)))


if __name__ == "__main__":
    main()
