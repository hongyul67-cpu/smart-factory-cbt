"""figs.js 의 「가져온 그림」 구역을 짝 도구의 최신 figs.js 로 다시 채운다.

    python build_figs.py

figs.js 는 세 덩어리다.
  ① 새로 그린 그림 (/*@@NEW@@*/ … /*@@END NEW@@*/)  — 손으로 고친다
  ② 가져온 그림   (/*@@COPY …@@*/ … /*@@END COPY@@*/) — 이 스크립트가 덮어쓴다(손대지 말 것)
  ③ 문항 ↔ 그림 대응표 QFIG (/*@@QFIG@@*/ … /*@@END QFIG@@*/) — 손으로 고친다

짝 도구의 그림을 고쳤으면 이 스크립트를 한 번 돌리면 된다.
가져온 그림은 원본 파일을 통째로 함수 하나로 감싸 넣는다(도구마다 도우미 함수가 달라서).
그 가운데 PICK 에 적은 것만 FIGS 에 이름을 붙여 넣는다.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(HERE, 'figs.js')

SRC = [  # (변수 이름, 폴더)
    ('M', '스마트공장 마스터'),
    ('P', '공유압 마스터'),
    ('S', '시퀀스 PLC 마스터'),
]

# 이 도구에서 쓰는 이름 : 원본의 이름
PICK = {
    'M': {k: k for k in '''osi osiTcp cables protocol modulation lineCode switching mux dteDce fwIds jitter netParts netScale
          mtbf rssi collect edge adc bias dataInfo cast robotSys cobot arm encoder frames robotTypes motion robotCell
          safety4 scada zone ipPlan hmiSys hmiChain ifChain opcua opcTier rdbTsdb law riskMatrix loop openClosed onoff
          blockEq plcParts relayPlc plcLang ladderRule contacts timer hmiScreen meters sensorSpec sensorChain photo
          thermo hall sensorTree slip dcMotor servoStep trip inverter startCur pneuSys pressure fluidLaws dirValve
          cylinder meter'''.split()},
    'P': {k: k for k in 'frl pilot shuttle solenoid seqv quickexh tri hold compress'.split()},
    'S': {'loto': 'loto', 'counter': 'ctu-chart', 'gates': 'and-or', 'scan': 'scan',
          'dblCoil': 'double-coil', 'reverse': 'fwd-rev'},
}


def copy_block():
    out = ['/*@@COPY — build_figs.py 가 채운다. 손대지 말 것@@*/', 'var FIGS_SRC = {};']
    for var, folder in SRC:
        path = os.path.join(ROOT, folder, 'figs.js')
        src = open(path, encoding='utf-8').read()
        if 'var FIGS =' not in src:
            sys.exit('원본 모양이 달라졌습니다: ' + path)
        body = src.replace('var FIGS =', 'return', 1)
        out.append('/* ── 복사본: %s/figs.js ── */' % folder)
        out.append('FIGS_SRC.%s = (function () {\n%s\n})();' % (var, body.rstrip()))
    pick = ',\n  '.join('%s: {%s}' % (v, ', '.join("'%s': '%s'" % kv for kv in PICK[v].items())) for v, _ in SRC)
    out.append('''(function () {
  var PICK = {
  %s
  };
  Object.keys(PICK).forEach(function (v) {
    var src = FIGS_SRC[v] || {};
    Object.keys(PICK[v]).forEach(function (k) {
      var e = src[PICK[v][k]];
      if (e && !FIGS[k]) FIGS[k] = e;
      else if (!e && window.console) console.warn('[figs.js] 가져올 그림 없음: ' + v + '.' + PICK[v][k]);
    });
  });
})();''' % pick)
    out.append('/*@@END COPY@@*/')
    return '\n'.join(out)


def main():
    cur = open(OUT, encoding='utf-8').read()
    new = re.sub(r'/\*@@COPY.*?/\*@@END COPY@@\*/', lambda m: copy_block(), cur, flags=re.S)
    if new == cur and '/*@@COPY' not in cur:
        sys.exit('figs.js 에 /*@@COPY@@*/ 자리가 없습니다')
    open(OUT, 'w', encoding='utf-8', newline='\n').write(new)
    n = sum(len(p) for p in PICK.values())
    print('figs.js 다시 구움 — 가져온 그림 %d장, 크기 %d KB' % (n, len(new.encode('utf-8')) // 1024))


if __name__ == '__main__':
    main()
