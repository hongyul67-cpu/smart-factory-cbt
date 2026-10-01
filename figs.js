/* ══════════════════════════════════════════════════════════════
   스마트공장기능사 필기 CBT — 해설 그림 (해설03 · 2026-10-01)
   공용 그리기 도우미 links/fig.js 를 쓴다. 이 도구에는 배우기 화면이 없어서
   문제를 푼 뒤 보는 해설(연습 · 종합시험 결과 · CBT 실전 결과 · 오답노트) 아래에 그림을 한 장 붙인다.

   세 덩어리
     ① 새로 그린 그림 30장  (NEW 표식)      — 짝 도구에 없는 주제. 손으로 고친다
     ② 가져온 그림          (COPY 표식)     — 스마트공장 마스터 · 공유압 마스터 · 시퀀스 PLC 마스터의 figs.js 복사본.
                                               build_figs.py 가 덮어쓴다. 원본을 고친 뒤 python build_figs.py
     ③ QFIG 대응표          (QFIG 표식)     — 그림 키 : 문항 아이디들. 문항 글은 없다(아이디만) → 평문으로 둔다.
                                               중복 문항(d)도 원본과 같은 그림으로 적어 두었다.

   문항 원문은 교재 저작물이라 이 파일에 넣지 않는다. 그림의 이름표 · 수치는 해설과 교재 전사본에 있는 것만 썼다.
   해설은 답을 고른 뒤에만 보이므로 그림이 정답을 미리 보여 주는 일은 없다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = {};

/*@@NEW@@*//* ═══════════ 새로 그린 그림 (해설03 · 2026-10-01) ═══════════
   해설에 붙일 그림 가운데 짝 도구(스마트공장 마스터 등)에 없는 주제만 새로 그렸다.
   수치는 문항 해설과 교재 전사본(_작업/스마트공장 전사/_src/이론/)에 있는 값만 쓴다. 예시 숫자는 캡션에 「예시」. */
(function () {
  var F = window.FIG;
  if (!F) return;
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, path = F.path, poly = F.poly, callout = F.callout;
  function add(key, cap, draw) { FIGS[key] = { cap: cap, draw: draw }; }

  /* ── 작은 도우미 ─────────────────────────── */
  function T(x, y, s, o) { o = o || {}; if (o.a == null) o.a = 'm'; return t(x, y, s, o); }
  function S(x, y, s, o) { o = o || {}; o.size = o.size || 13; o.c = o.c || C.sub; if (o.a == null) o.a = 'm'; return t(x, y, s, o); }
  function H(x, y, s, o) { o = o || {}; o.size = o.size || 16; o.b = 1; if (o.a == null) o.a = 'm'; return t(x, y, s, o); }
  function circ(cx, cy, r, o) { return F.circle(cx, cy, r, o || {}); }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3) + '" fill="' + (c || C.ink) + '"/>'; }
  function dev(x, y, w, h, label, col, fill, o) {
    o = o || {};
    return box(x, y, w, h, { fill: fill || C.grayL, c: col || C.ink, label: label, size: o.size || 15, lc: o.lc || col || C.ink, r: o.r });
  }
  function axes(x0, y0, w, h, xl, yl) {
    return arrow(x0, y0, x0 + w, y0, { c: C.sub, w: 1.4, head: 9 }) + arrow(x0, y0, x0, y0 - h, { c: C.sub, w: 1.4, head: 9 }) +
      (xl ? t(x0 + w, y0 + 16, xl, { size: 13, c: C.sub, a: 'e' }) : '') +
      (yl ? t(x0 + 8, y0 - h + 2, yl, { size: 13, c: C.sub, a: 's' }) : '');
  }
  function sinePts(x0, w, cy, amp, cycles, phase) {
    var p = [], k = Math.max(8, Math.round(w / 2));
    for (var i = 0; i <= k; i++) { var u = i / k; p.push([x0 + w * u, cy - amp * Math.sin(2 * Math.PI * cycles * u + (phase || 0))]); }
    return p;
  }
  function divV(x, y1, y2) { return line(x, y1, x, y2, { c: C.edge, w: 1.4 }); }
  function divH(y, x1, x2) { return line(x1 || 14, y, x2 || 466, y, { c: C.edge, w: 1.4 }); }
  /* 저항(지그재그) — 가로: (x1,y)~(x2,y) / 세로: (x,y1)~(x,y2) */
  function resH(x1, y, x2, o) {
    o = o || {}; var n = 6, a = o.a || 7, p = [[x1, y]], L = x2 - x1;
    for (var i = 1; i < n * 2; i += 2) p.push([x1 + L * i / (n * 2), y + ((i + 1) / 2 % 2 ? -a : a)]);
    p.push([x2, y]);
    return poly(p, { c: o.c || C.ink, w: o.w || 1.8 });
  }
  function resV(x, y1, y2, o) {
    o = o || {}; var n = 6, a = o.a || 7, p = [[x, y1]], L = y2 - y1;
    for (var i = 1; i < n * 2; i += 2) p.push([x + ((i + 1) / 2 % 2 ? -a : a), y1 + L * i / (n * 2)]);
    p.push([x, y2]);
    return poly(p, { c: o.c || C.ink, w: o.w || 1.8 });
  }
  /* 코일(혹 n개) — 세로 */
  function coilV(x, y1, y2, o) {
    o = o || {}; var n = o.n || 4, h = (y2 - y1) / n, d = 'M' + x + ',' + y1;
    for (var i = 0; i < n; i++) d += ' a' + (h / 2) + ',' + (h / 2) + ' 0 0 1 0,' + h;
    return path(d, { c: o.c || C.ink, w: o.w || 1.8 });
  }
  function coilH(x1, y, x2, o) {
    o = o || {}; var n = o.n || 4, w = (x2 - x1) / n, d = 'M' + x1 + ',' + y;
    for (var i = 0; i < n; i++) d += ' a' + (w / 2) + ',' + (w / 2) + ' 0 0 1 ' + w + ',0';
    return path(d, { c: o.c || C.ink, w: o.w || 1.8 });
  }
  function gnd(x, y, c) {
    c = c || C.ink;
    return line(x, y, x, y + 8, { c: c, w: 1.6 }) + line(x - 10, y + 8, x + 10, y + 8, { c: c, w: 1.8 }) +
      line(x - 6, y + 12, x + 6, y + 12, { c: c, w: 1.6 }) + line(x - 2.5, y + 16, x + 2.5, y + 16, { c: c, w: 1.4 });
  }
  function person(x, y, c, s) {      /* (x,y) = 머리 가운데 */
    c = c || C.ink; s = s || 1;
    return circ(x, y, 7 * s, { fill: '#fff', c: c, w: 1.8 }) + line(x, y + 7 * s, x, y + 28 * s, { c: c, w: 2.2 }) +
      line(x - 10 * s, y + 15 * s, x + 10 * s, y + 15 * s, { c: c, w: 2 }) +
      line(x, y + 28 * s, x - 8 * s, y + 42 * s, { c: c, w: 2 }) + line(x, y + 28 * s, x + 8 * s, y + 42 * s, { c: c, w: 2 });
  }
  /* 로봇 팔 — 바닥 (x,y), 팔 끝 (ex,ey) 을 돌려준다 */
  function robo(x, y, a1, a2, c, s) {
    c = c || C.ink; s = s || 1;
    var L1 = 34 * s, L2 = 30 * s, r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
    var jx = x, jy = y - 12 * s, ex1 = jx + L1 * Math.cos(r1), ey1 = jy - L1 * Math.sin(r1), ex2 = ex1 + L2 * Math.cos(r2), ey2 = ey1 - L2 * Math.sin(r2);
    var o = box(x - 14 * s, y - 12 * s, 28 * s, 12 * s, { fill: C.grayM, c: c, r: 2, w: 1.6 });
    o += line(jx, jy, ex1, ey1, { c: c, w: 7 * s }) + line(ex1, ey1, ex2, ey2, { c: c, w: 5 * s });
    o += circ(jx, jy, 4 * s, { fill: '#fff', c: c, w: 1.4 }) + circ(ex1, ey1, 3.5 * s, { fill: '#fff', c: c, w: 1.4 });
    robo.end = [ex2, ey2];
    return o;
  }

  /* ═══════════ 01·02 통신 네트워크 ═══════════ */

  add('topology', '네트워크 모양(토폴로지) 네 가지 — 버스 · 스타 · 링 · 메시',
    function () {
      var s = divV(240, 14, 316) + divH(165);
      function nd(x, y, c) { return circ(x, y, 10, { fill: '#fff', c: c || C.blue, w: 1.8 }); }
      /* 버스 */
      s += H(120, 24, '버스', { c: C.blue });
      s += line(30, 66, 210, 66, { w: 3 }) + box(18, 58, 12, 16, { fill: C.orange, c: C.orange, r: 2 }) + box(210, 58, 12, 16, { fill: C.orange, c: C.orange, r: 2 });
      [58, 98, 142, 182].forEach(function (x) { s += line(x, 66, x, 92, { w: 1.6 }) + nd(x, 102); });
      s += S(120, 132, '케이블 한 줄을 함께 쓴다', { c: C.ink }) + S(120, 150, '양 끝 터미네이터(신호 반사 방지)', { c: C.orange, b: 1 });
      /* 스타 */
      var cx = 360, cy = 82;
      s += H(cx, 24, '스타', { c: C.blue });
      for (var i = 0; i < 5; i++) {
        var a = (-90 + i * 72) * Math.PI / 180, x = cx + 46 * Math.cos(a) * 1.25, y = cy + 40 * Math.sin(a);
        s += line(cx, cy, x, y, { w: 1.6 }) + nd(x, y);
      }
      s += dev(cx - 26, cy - 12, 52, 24, '스위치', C.orange, C.orangeL, { size: 13 });
      s += S(cx, 138, '한 노드 고장은 격리된다', { c: C.ink }) + S(cx, 155, '가운데 장비 고장 → 전체 멈춤', { c: C.red, b: 1 });
      /* 링 */
      cx = 120; cy = 248;
      s += H(cx, 186, '링', { c: C.blue });
      s += circ(cx, cy, 40, { fill: 'none', c: C.ink, w: 2 });
      for (i = 0; i < 5; i++) { a = (-90 + i * 72) * Math.PI / 180; s += nd(cx + 40 * Math.cos(a), cy + 40 * Math.sin(a)); }
      s += path('M' + (cx + 52) + ',' + (cy - 22) + ' A56,56 0 0 1 ' + (cx + 50) + ',' + (cy + 26), { c: C.orange, w: 2 }) +
        F.arrow(cx + 52, cy + 22, cx + 49, cy + 28, { c: C.orange, head: 9, w: 2 }) + t(cx + 62, cy + 2, '토큰', { size: 13, b: 1, c: C.orange });
      s += S(cx, 304, '토큰을 가진 노드만 보낸다(토큰 패싱)', { c: C.ink });
      /* 메시 */
      cx = 360; cy = 246;
      s += H(cx, 186, '메시', { c: C.blue });
      var pts = [];
      for (i = 0; i < 5; i++) { a = (-90 + i * 72) * Math.PI / 180; pts.push([cx + 50 * Math.cos(a), cy + 40 * Math.sin(a)]); }
      for (i = 0; i < 5; i++) for (var k = i + 1; k < 5; k++) s += line(pts[i][0], pts[i][1], pts[k][0], pts[k][1], { w: 1.4 });
      pts.forEach(function (p) { s += nd(p[0], p[1]); });
      s += S(cx, 300, '모두 연결 — 길이 끊겨도 우회', { c: C.ink }) + S(cx, 317, '케이블이 많아 설치 비용이 높다', { c: C.red, b: 1 });
      return F.svg(480, 330, s);
    });

  add('netQuality', '네트워크 품질 기준(교재) — 우수 · 허용 범위. 대역폭은 70% 이하 권장, 80% 경고, 90% 넘으면 위험',
    function () {
      var s = '', x0 = 168, W = 296;
      s += box(150, 14, 14, 14, { fill: C.greenL, c: C.green, r: 3 }) + t(170, 21, '우수', { size: 13 }) +
        box(220, 14, 14, 14, { fill: C.blueL, c: C.blue, r: 3 }) + t(240, 21, '허용', { size: 13 }) +
        box(290, 14, 14, 14, { fill: C.redL, c: C.red, r: 3 }) + t(310, 21, '넘으면 문제', { size: 13 });
      function row(y, name, sub, segs, ticks) {
        var o = t(16, y, name, { size: 15, b: 1 }) + t(16, y + 20, sub, { size: 13, c: C.sub });
        var x = x0;
        segs.forEach(function (g) {
          var w = W * g[0];
          o += box(x, y - 14, w, 28, { fill: g[1], c: g[2], r: 0, w: 1.4 });
          if (g[3]) o += T(x + w / 2, y, g[3], { size: 13, b: 1, c: g[2], halo: false });
          x += w;
        });
        ticks.forEach(function (k) { o += line(x0 + W * k[0], y + 14, x0 + W * k[0], y + 22, { c: C.ink, w: 1.4 }) + T(x0 + W * k[0], y + 32, k[1], { size: 13, b: 1 }); });
        return o;
      }
      s += row(66, '응답시간', 'Ping 왕복', [[1 / 3, C.greenL, C.green, '우수'], [1 / 3, C.blueL, C.blue, '허용'], [1 / 3, C.redL, C.red, '느림']],
        [[1 / 3, '50ms'], [2 / 3, '100ms']]);
      s += row(140, '패킷 손실률', '잃어버린 비율', [[1 / 3, C.greenL, C.green, '우수'], [1 / 3, C.blueL, C.blue, '허용'], [1 / 3, C.redL, C.red, '많음']],
        [[1 / 3, '0.1%'], [2 / 3, '1%']]);
      s += row(214, '대역폭 사용률', '얼마나 꽉 찼나', [[0.36, C.greenL, C.green, '우수'], [0.24, C.blueL, C.blue, '허용'], [0.24, C.grayL, C.sub, '경고'], [0.16, C.redL, C.red, '위험']],
        [[0.36, '50%'], [0.6, '70%'], [0.72, '80%'], [0.84, '90%']]);
      return F.svg(480, 262, s);
    });

  add('tcpUdp', 'TCP 는 연결을 맺고 받았는지 확인하며 보낸다(신뢰성) · UDP 는 연결 없이 그냥 보낸다(빠름)',
    function () {
      var s = divV(240, 14, 266);
      function life(x, lab) { return T(x, 46, lab, { size: 13, b: 1 }) + line(x, 56, x, 206, { c: C.grayM, w: 2, dash: '5 4' }); }
      function msg(x1, y1, x2, y2, lab, c, lost) {
        var o = lost ? line(x1, y1, (x1 + x2) / 2, (y1 + y2) / 2, { c: c, w: 1.8 }) + T((x1 + x2) / 2 + 2, (y1 + y2) / 2 + 2, '✕', { size: 18, b: 1, c: C.red })
          : arrow(x1, y1, x2, y2, { c: c, w: 1.8, head: 8 });
        return o + T((x1 + x2) / 2, (y1 + y2) / 2 - 11, lab, { size: 13, c: c, b: 1 });
      }
      s += H(120, 20, 'TCP — 연결형', { c: C.blue }) + life(46, '보냄') + life(194, '받음');
      s += msg(46, 70, 194, 86, '연결 요청', C.sub) + msg(194, 104, 46, 120, '수락', C.sub);
      s += msg(46, 142, 194, 158, '데이터', C.blue) + msg(194, 176, 46, 192, '받았음(확인)', C.green);
      s += S(120, 228, '확인하며 보낸다 → 안정성 높음', { c: C.ink, b: 1 }) + S(120, 246, '잃으면 다시 보낸다', { c: C.ink });
      s += H(360, 20, 'UDP — 비연결형', { c: C.orange }) + life(286, '보냄') + life(434, '받음');
      s += msg(286, 76, 434, 92, '데이터 1', C.orange) + msg(286, 118, 434, 134, '데이터 2', C.orange, 1) + msg(286, 160, 434, 176, '데이터 3', C.orange);
      s += S(360, 228, '확인 없이 연달아 → 빠르다', { c: C.ink, b: 1 }) + S(360, 246, '잃어도 모른다(오류 검출 약함) · 영상', { c: C.ink });
      return F.svg(480, 266, s);
    });

  add('rtHardSoft', '실시간 시스템 — 마감 시각을 넘기면 경성은 치명적 실패, 연성은 품질만 조금 떨어진다',
    function () {
      var s = '', dl = 300;
      s += arrow(30, 206, 462, 206, { c: C.sub, w: 1.4, head: 9 }) + t(462, 222, '시간', { size: 13, c: C.sub, a: 'e' });
      s += line(dl, 34, dl, 206, { c: C.red, w: 2, dash: '7 5' }) + T(dl, 22, '마감 시각', { size: 14, b: 1, c: C.red });
      function row(y, name, sub, col, colL, mark) {
        var o = t(30, y - 26, name, { size: 15, b: 1, c: col });
        o += box(60, y - 12, dl - 60, 24, { fill: C.blueL, c: C.blue, r: 4 }) + T((60 + dl) / 2, y, '처리', { size: 13, b: 1, c: C.blue, halo: false });
        o += box(dl, y - 12, 60, 24, { fill: colL, c: col, r: 4 }) + T(dl + 30, y, '늦음', { size: 13, b: 1, c: col, halo: false });
        o += t(dl + 72, y - 6, mark[0], { size: 14, b: 1, c: col }) + t(dl + 72, y + 13, mark[1], { size: 13, c: C.sub });
        return o + t(60, y + 28, sub, { size: 13, c: C.ink });
      }
      s += row(78, '경성(hard) 실시간', '정해진 시간 안에 반드시 끝나야 한다', C.red, C.redL, ['치명적 결과', '사고·불량']);
      s += row(158, '연성(soft) 실시간', '어느 정도의 지연은 허용된다', C.orange, C.orangeL, ['품질만 저하', '조금 느려짐']);
      return F.svg(480, 230, s);
    });

  /* ═══════════ 03 데이터 수집 ═══════════ */

  add('nyquist', '나이퀴스트 정리 — 신호 주파수의 2배 이상으로 떠야 원래 모양이 남는다 (예: 100Hz → 200 S/s 이상)',
    function () {
      var s = '', x0 = 40, W = 400;
      /* 위 — 한 주기에 4번 */
      s += t(16, 22, '충분히 자주 뜬다 — 한 주기에 4번(2배 이상)', { size: 15, b: 1, c: C.green });
      s += line(x0, 82, x0 + W, 82, { c: C.edge, w: 1 }) + poly(sinePts(x0, W, 82, 34, 3), { c: C.sub, w: 2 });
      for (var i = 0; i <= 12; i++) {
        var u = i / 12, x = x0 + W * u, y = 82 - 34 * Math.sin(2 * Math.PI * 3 * u);
        s += line(x, 82, x, y, { c: C.green, w: 1.2 }) + dot(x, y, 4, C.green);
      }
      s += S(240, 134, '점을 이으면 원래 신호와 같은 모양', { c: C.ink });
      s += divH(150);
      /* 아래 — 너무 드물게: 한 주기에 1.25번 → 느린 엉뚱한 파형 */
      s += t(16, 172, '너무 드물게 뜬다 — 한 주기에 1.25번', { size: 15, b: 1, c: C.red });
      s += line(x0, 232, x0 + W, 232, { c: C.edge, w: 1 }) + poly(sinePts(x0, W, 232, 34, 4), { c: C.grayM, w: 2 });
      s += poly(sinePts(x0, W, 232, 34, 1, Math.PI), { c: C.red, w: 2, dash: '7 5' });
      for (i = 0; i <= 5; i++) {
        u = i / 5; x = x0 + W * u; y = 232 - 34 * Math.sin(2 * Math.PI * 4 * u);
        s += dot(x, y, 4.5, C.red);
      }
      s += S(240, 286, '빨간 점만 이으면 원래와 다른 느린 파형(왜곡)', { c: C.red, b: 1 });
      return F.svg(480, 302, s);
    });

  add('adcLin', 'ADC 비선형성 — INL 은 전달 곡선 전체가 이상 직선에서 벗어난 정도, DNL 은 한 계단(1 LSB) 폭이 고르지 않은 정도',
    function () {
      var s = divV(240, 14, 262);
      /* INL */
      s += H(120, 22, 'INL — 전체가 휘어짐', { c: C.orange, size: 15 });
      s += axes(34, 236, 190, 190, '입력 전압', '디지털 값');
      s += line(34, 236, 214, 56, { c: C.sub, w: 1.6, dash: '6 5' }) + t(150, 104, '이상 직선', { size: 13, c: C.sub, a: 'e' });
      var p = [];
      for (var i = 0; i <= 30; i++) { var u = i / 30; p.push([34 + 180 * u, 236 - 180 * u + 30 * Math.sin(Math.PI * u)]); }
      s += poly(p, { c: C.orange, w: 2.6 });
      s += arrow(124, 146, 124, 172, { c: C.red, w: 1.4, head: 7, both: true }) + t(132, 186, '벗어난 만큼 = INL', { size: 13, b: 1, c: C.red });
      /* DNL */
      s += H(360, 22, 'DNL — 계단 폭이 들쭉날쭉', { c: C.blue, size: 15 });
      s += axes(272, 236, 192, 190, '입력 전압', '');
      var ws = [28, 28, 46, 12, 28, 28], x = 272, y = 236, d = 'M272,236';
      var marks = '';
      ws.forEach(function (w, k) {
        d += ' H' + (x + w) + ' V' + (y - 28);
        if (k === 2) marks += line(x, y, x + w, y, { c: C.orange, w: 5 }) + t(x + w / 2, y + 14, '넓다', { size: 13, b: 1, c: C.orange, a: 'm' });
        if (k === 3) marks += line(x, y, x + w, y, { c: C.red, w: 5 }) + t(x + w + 6, y - 2, '좁다', { size: 13, b: 1, c: C.red });
        x += w; y -= 28;
      });
      s += path(d, { c: C.blue, w: 2.4 }) + marks;
      s += F.dim(272, 244, 300, 244, '', {}) + t(286, 260, '1 LSB', { size: 13, b: 1, a: 'm' });
      return F.svg(480, 270, s);
    });

  add('zin', '입력 임피던스 — DAQ 의 입력 임피던스가 크면 신호원에서 전류를 거의 끌어오지 않아 신호 전압이 그대로 읽힌다',
    function () {
      var s = divH(140);
      function row(y0, big) {
        var yt = y0 + 30, yb = y0 + 96, xs = 54, xr = 250, col = big ? C.green : C.red, o = '';
        o += circ(xs, (yt + yb) / 2, 17, { fill: '#fff', c: C.ink, w: 1.8 }) + T(xs, (yt + yb) / 2, '~', { size: 18, b: 1, halo: false });
        o += line(xs, yt, xs, (yt + yb) / 2 - 17, { w: 1.8 }) + line(xs, (yt + yb) / 2 + 17, xs, yb, { w: 1.8 });
        o += line(xs, yt, 92, yt, { w: 1.8 }) + resH(92, yt, 146, {}) + line(146, yt, xr, yt, { w: 1.8 });
        o += line(xs, yb, xr, yb, { w: 1.8 });
        o += line(xr, yt, xr, yt + 8, { w: 1.8 }) + resV(xr, yt + 8, yb - 8, { a: big ? 11 : 6, c: col, w: big ? 2.6 : 1.8 }) + line(xr, yb - 8, xr, yb, { w: 1.8 });
        o += T(119, yt - 16, '센서 내부 저항', { size: 13, c: C.sub });
        o += T(xs, yb + 16, '센서(신호원)', { size: 13, b: 1 });
        o += t(xr + 16, (yt + yb) / 2, big ? '입력 임피던스 큼' : '입력 임피던스 작음', { size: 14, b: 1, c: col });
        o += arrow(170, yt - 0.5, 214, yt - 0.5, { c: col, w: big ? 1.4 : 5, head: big ? 8 : 13 });
        o += t(176, yt + 18, big ? '전류 조금' : '전류 많이', { size: 13, b: 1, c: col });
        o += t(xr + 16, (yt + yb) / 2 + 22, big ? '→ 측정값 ≈ 원래 신호' : '→ 전압이 깎여 측정값↓', { size: 13, c: C.ink });
        return o;
      }
      s += row(6, false) + row(146, true);
      return F.svg(480, 282, s);
    });

  add('diffCh', '단일 채널과 차동 채널 — 차동은 두 선의 차이만 읽으므로 두 선에 똑같이 들어온 노이즈가 지워진다',
    function () {
      var s = divH(132);
      function pulse(x, y, w, h, spike, c) {
        var d = 'M' + x + ',' + y + ' H' + (x + w * 0.25) + ' V' + (y - h) + ' H' + (x + w * 0.45);
        if (spike) d += ' L' + (x + w * 0.5) + ',' + (y - h - spike) + ' L' + (x + w * 0.55) + ',' + (y - h);
        d += ' H' + (x + w * 0.75) + ' V' + y + ' H' + (x + w);
        return path(d, { c: c, w: 2 });
      }
      function bolt(x, y) { return poly([[x, y], [x - 7, y + 14], [x + 2, y + 14], [x - 5, y + 28]], { c: C.orange, w: 2.4 }) + t(x + 6, y + 4, '노이즈', { size: 13, b: 1, c: C.orange }); }
      s += t(16, 22, '단일 채널 — 선 하나 + 접지', { size: 15, b: 1 });
      s += dev(16, 48, 60, 34, '보냄', C.ink, C.grayL, { size: 14 }) + dev(330, 48, 60, 34, '받음', C.ink, C.grayL, { size: 14 });
      s += line(76, 58, 330, 58, { c: C.blue, w: 2.2 }) + line(76, 76, 330, 76, { c: C.sub, w: 1.6 }) + t(200, 92, '접지(GND)', { size: 13, c: C.sub, a: 'm' });
      s += bolt(250, 26) + pulse(396, 82, 64, 34, 18, C.red);
      s += t(428, 112, '그대로 섞임', { size: 13, b: 1, c: C.red, a: 'm' });
      s += t(16, 150, '차동 채널 — 두 선(+ · −)의 차이', { size: 15, b: 1 });
      s += dev(16, 182, 60, 54, '보냄', C.ink, C.grayL, { size: 14 }) + dev(300, 182, 70, 54, '차이', C.green, C.greenL, { size: 14 });
      s += line(76, 196, 300, 196, { c: C.blue, w: 2.2 }) + line(76, 222, 300, 222, { c: C.purple, w: 2.2 });
      s += t(84, 190, '+', { size: 15, b: 1, c: C.blue }) + t(84, 236, '−', { size: 15, b: 1, c: C.purple });
      s += bolt(250, 164) + t(180, 246, '두 선에 똑같이 들어옴', { size: 13, c: C.sub, a: 'm' });
      s += pulse(386, 226, 70, 34, 0, C.green) + t(421, 256, '노이즈가 지워짐', { size: 13, b: 1, c: C.green, a: 'm' });
      return F.svg(480, 270, s);
    });

  add('autoSteps', '자동화의 발전 — 고정생산(FA) → 유연생산(FMS) → 컴퓨터 통합 생산(CIM), 단계마다 묶는 범위가 넓어진다',
    function () {
      var s = '', st = [
        [20, 170, 'FA', '고정 생산', '한 제품을 대량으로', C.sub, C.grayL],
        [172, 126, 'FMS', '유연 생산', '여러 제품을 바꿔 가며', C.blue, C.blueL],
        [324, 82, 'CIM', '컴퓨터 통합 생산', '설계~판매 전부 통합', C.orange, C.orangeL]];
      st.forEach(function (k, i) {
        s += box(k[0], k[1], 140, 254 - k[1], { fill: k[6], c: k[5], r: 6 });
        s += T(k[0] + 70, k[1] + 20, k[2], { size: 18, b: 1, c: k[5], halo: false }) + T(k[0] + 70, k[1] + 44, k[3], { size: 14, b: 1, halo: false });
        s += T(k[0] + 70, k[1] + 64, k[4], { size: 13, c: C.ink, halo: false });
        if (i < 2) s += arrow(k[0] + 112, k[1] - 10, st[i + 1][0] + 40, st[i + 1][1] - 10, { c: C.sub, w: 1.6, head: 9 });
      });
      s += t(20, 36, '단위 기계 자동화에서 시작해', { size: 14 }) + t(20, 56, '공장 → 기업 전체로 넓어진다', { size: 14, b: 1 });
      return F.svg(480, 268, s);
    });

  add('auto5', '자동화 시스템의 구성 — 센서가 감지하고, 프로세서가 지시하고, 액추에이터가 움직이고, 메커니즘이 물리적 바탕. 여기에 소프트웨어 · 네트워크를 더하면 5대 요소',
    function () {
      var s = box(10, 34, 460, 246, { fill: 'none', c: C.purple, r: 12, w: 1.4, dash: '6 5' });
      s += t(24, 22, '+ 소프트웨어', { size: 14, b: 1, c: C.purple }) + t(456, 22, '+ 네트워크', { size: 14, b: 1, c: C.purple, a: 'e' });
      /* 프로세서 */
      s += dev(184, 52, 112, 42, '프로세서', C.blue, C.blueL, { size: 15 }) + S(240, 108, '동작을 지시(두뇌)', { c: C.blue, b: 1 });
      /* 센서 */
      s += dev(352, 132, 76, 34, '센서', C.green, C.greenL, { size: 15 }) + S(390, 180, '동작을 감지', { c: C.green, b: 1 });
      s += line(370, 190, 370, 216, { c: C.green, w: 1.4, dash: '4 3' });
      /* 액추에이터(실린더) */
      s += box(30, 186, 70, 30, { fill: C.orangeL, c: C.orange, r: 3 }) + box(88, 190, 6, 22, { fill: C.orange, c: C.orange, r: 0 }) + line(94, 201, 138, 201, { c: C.orange, w: 5 });
      s += T(65, 172, '액추에이터', { size: 15, b: 1, c: C.orange }) + S(65, 232, '기계를 움직임', { c: C.orange, b: 1 });
      /* 메커니즘(컨베이어) */
      s += box(146, 218, 270, 14, { fill: C.grayM, c: C.ink, r: 7 });
      [160, 205, 250, 295, 340, 385, 402].forEach(function (x) { s += circ(x, 225, 5, { fill: '#fff', c: C.ink, w: 1.2 }); });
      s += box(146, 190, 26, 28, { fill: C.grayL, c: C.ink, r: 2 });
      s += T(281, 252, '메커니즘 — 기계 구조(물리적 바탕)', { size: 14, b: 1 });
      /* 신호 화살표 */
      s += arrow(380, 130, 300, 84, { c: C.green, w: 1.8, head: 9 }) + t(350, 96, '감지 신호', { size: 13, c: C.green, a: 's' });
      s += arrow(190, 94, 124, 184, { c: C.blue, w: 1.8, head: 9 }) + t(146, 124, '동작 명령', { size: 13, c: C.blue, a: 'e' });
      s += S(240, 272, '3대 요소 = 메커니즘 · 액추에이터 · 센서', { c: C.ink });
      return F.svg(480, 290, s);
    });

  add('maintTypes', '보전의 종류를 설비의 일생 위에 — 보전 예방(설계) · 예방 보전(고장 전 점검) · 예지 보전(데이터로 예측) · 사후 보전(고장 뒤 수리) · 개량 보전(개조로 재발 방지)',
    function () {
      var s = '', y0 = 186;
      s += arrow(20, y0, 464, y0, { c: C.sub, w: 1.4, head: 9 }) + t(462, y0 - 12, '설비의 일생 →', { size: 13, c: C.sub, a: 'e' });
      s += T(56, y0 + 14, '설계', { size: 13, c: C.sub }) + T(190, y0 + 14, '가동', { size: 13, c: C.sub }) + T(392, y0 + 14, '다시 가동', { size: 13, c: C.sub });
      /* 설비 상태 곡선 — 높을수록 좋다 */
      s += t(24, 98, '설비\n상태', { size: 13, c: C.sub });
      s += path('M96,104 C170,108 250,128 316,170', { c: C.blue, w: 2.6 });
      s += path('M330,108 C380,110 420,114 456,118', { c: C.blue, w: 2.6 });
      s += line(316, 170, 330, 108, { c: C.blue, w: 1.4, dash: '4 3' });
      s += T(318, 178, '✕', { size: 18, b: 1, c: C.red });
      /* 예방 점검 표시 */
      [140, 190, 240].forEach(function (x) { s += circ(x, 150, 7, { fill: C.greenL, c: C.green, w: 1.4 }); });
      /* 예지 — 진동 파형 */
      s += poly(sinePts(258, 46, 70, 6, 5), { c: C.purple, w: 1.6 }) + line(258, 70, 304, 70, { c: C.edge, w: 1 });
      function lab(x, y, name, desc, c) { return T(x, y, name, { size: 14, b: 1, c: c }) + T(x, y + 18, desc, { size: 13 }); }
      s += lab(72, 30, '보전 예방', '설계에 미리 반영', C.orange) + callout(60, 96, 60, 64, '', { c: C.orange });
      s += lab(282, 30, '예지 보전', '데이터로 고장 예측', C.purple);
      s += lab(412, 30, '개량 보전', '개조해 재발 방지', C.blue) + callout(420, 112, 420, 52, '', { c: C.blue });
      s += lab(176, 222, '예방 보전', '고장 전에 정기 점검', C.green) + callout(190, 158, 190, 212, '', { c: C.green });
      s += lab(336, 222, '사후 보전', '고장 난 뒤 수리', C.red) + callout(318, 184, 330, 212, '', { c: C.red });
      return F.svg(480, 262, s);
    });

  /* ═══════════ 04 로봇 ═══════════ */

  add('agvPath', '이동 로봇의 길 찾기 — 고정 경로는 바닥에 깔린 유도선을 따라가고, 자유 경로는 LiDAR · 비전으로 주변을 읽어 스스로 길을 정한다',
    function () {
      var s = divV(240, 14, 236);
      function cart(x, y, c) { return box(x - 16, y - 11, 32, 22, { fill: '#fff', c: c, r: 4, w: 2 }) + dot(x - 9, y + 13, 3.5, C.ink) + dot(x + 9, y + 13, 3.5, C.ink); }
      s += H(120, 24, '고정 경로', { c: C.orange });
      s += box(22, 42, 196, 136, { fill: C.grayL, c: C.grayM, r: 6 });
      s += path('M56,72 H184 V148 H56 Z', { c: C.orange, w: 5, dash: '10 6' });
      s += dev(30, 58, 30, 26, 'A', C.ink, '#fff', { size: 13 }) + dev(180, 136, 30, 26, 'B', C.ink, '#fff', { size: 13 });
      s += cart(120, 72, C.orange) + arrow(140, 72, 160, 72, { c: C.orange, w: 2, head: 8 });
      s += S(120, 198, '바닥 유도선 · 자기테이프 · 레일', { c: C.ink, b: 1 }) + S(120, 216, '정해진 길만 달린다', { c: C.ink });
      s += H(360, 24, '자유 경로', { c: C.blue });
      s += box(262, 42, 196, 136, { fill: C.grayL, c: C.grayM, r: 6 });
      s += box(330, 60, 36, 46, { fill: C.grayM, c: C.ink, r: 3 }) + box(392, 120, 44, 30, { fill: C.grayM, c: C.ink, r: 3 });
      s += path('M290,158 C300,120 312,118 320,128 S380,100 410,80', { c: C.blue, w: 2.4, dash: '6 5' });
      for (var a = -60; a <= 60; a += 20) {
        var r = a * Math.PI / 180;
        s += line(290, 150, 290 + 48 * Math.sin(r + 0.4), 150 - 48 * Math.cos(r + 0.4), { c: C.red, w: 1, dash: '3 3' });
      }
      s += cart(290, 152, C.blue) + T(290, 132, 'LiDAR', { size: 13, b: 1, c: C.red });
      s += S(360, 198, 'LiDAR · 비전으로 지도를 만든다', { c: C.ink, b: 1 }) + S(360, 216, '장애물을 피해 스스로 길(AMR)', { c: C.ink });
      return F.svg(480, 236, s);
    });

  add('cobot4', '협동 로봇의 협동 운전 방식 네 가지 — 사람과 같은 공간에서 일하므로 멈추거나 · 느려지거나 · 힘을 제한한다',
    function () {
      var s = divV(240, 14, 326) + divH(170);
      function ttl(x, y, a, b) { return H(x, y, a, { size: 15 }) + S(x, y + 18, b, { c: C.blue, b: 1 }); }
      /* ① 안전 정격 감시 정지 */
      s += ttl(120, 22, '안전 정격 감시 정지', 'Safety-rated Monitored Stop');
      s += box(30, 56, 120, 90, { fill: C.redL, c: C.red, r: 8, w: 1.4, dash: '6 4' }) + robo(80, 140, 60, 10, C.ink, 1);
      s += person(184, 92, C.ink) + arrow(170, 116, 152, 116, { c: C.red, w: 1.8, head: 8 });
      s += box(98, 64, 46, 22, { fill: C.red, c: C.red, r: 4 }) + T(121, 75, '정지', { size: 13, b: 1, c: '#fff', halo: false });
      s += S(120, 162, '사람이 들어오면 멈춰서 기다린다', { c: C.ink });
      /* ② 핸드가이딩 */
      s += ttl(360, 22, '핸드가이딩', 'Hand-guiding');
      s += robo(320, 140, 55, 0, C.ink, 1);
      var e = robo.end;
      s += person(422, 82, C.ink) + line(412, 97, e[0] + 6, e[1], { c: C.ink, w: 2 });
      s += path('M' + (e[0] + 4) + ',' + (e[1] + 14) + ' Q' + (e[0] + 20) + ',' + (e[1] + 44) + ' ' + (e[0] - 22) + ',' + (e[1] + 48), { c: C.blue, w: 2, dash: '5 4' });
      s += S(360, 162, '손으로 잡고 끌어서 경로를 교시', { c: C.ink });
      /* ③ 속도 및 간격 감시 */
      s += ttl(120, 182, '속도 및 간격 감시', 'Speed and Separation Monitoring');
      s += path('M70,308 A100,100 0 0 1 170,208', { c: C.sub, w: 1.4, dash: '5 4' });
      s += path('M70,308 A70,70 0 0 1 140,238', { c: C.orange, w: 1.8, dash: '5 4' });
      s += path('M70,308 A40,40 0 0 1 110,268', { c: C.red, w: 2, dash: '5 4' });
      s += robo(58, 306, 50, 20, C.ink, 0.8);
      s += t(174, 222, '정상', { size: 13, c: C.sub }) + t(146, 252, '감속', { size: 13, b: 1, c: C.orange }) + t(114, 284, '정지', { size: 13, b: 1, c: C.red });
      s += person(204, 256, C.ink, 0.9);
      s += S(120, 322, '가까워질수록 느려지다 멈춘다', { c: C.ink });
      /* ④ 동력 및 힘 제한 */
      s += ttl(360, 182, '동력 및 힘 제한', 'Power and Force Limiting');
      s += robo(300, 300, 50, -5, C.ink, 1);
      e = robo.end;
      s += person(e[0] + 22, e[1] - 14, C.ink) + T(e[0] + 6, e[1] - 10, '✸', { size: 16, c: C.red, halo: false });
      s += box(410, 214, 18, 82, { fill: '#fff', c: C.ink, r: 3 }) + box(412, 252, 14, 42, { fill: C.orangeL, c: 'none', r: 0, w: 0 });
      s += line(404, 240, 434, 240, { c: C.red, w: 2 }) + t(438, 240, '한계', { size: 13, b: 1, c: C.red });
      s += S(360, 322, '닿아도 정해진 힘 이하로(ISO/TS 15066)', { c: C.ink });
      return F.svg(480, 336, s);
    });

  add('commission', '로봇 인터페이스 시스템 시운전 순서 — 시뮬레이션으로 프로그램부터, 자동 운전 전에 부분적 수동 운전, 맨 끝에 보존용 프로그램',
    function () {
      var st = [
        ['프로그램 점검', '시뮬레이션으로 먼저'],
        ['하드웨어 점검', '설치·배선·절연 내압·전원'],
        ['외부 배선 · 안전 회로', '비상정지·안전장치 동작'],
        ['부분적 수동 운전', '자동 운전 전에 반드시'],
        ['자동 운전', '작성한 프로그램으로'],
        ['에러 수정 · 이상 테스트', '이상 있으면 고쳐서 다시'],
        ['보존용 프로그램 작성', '정상 운전 확인 뒤 최종']];
      var s = '';
      st.forEach(function (k, i) {
        var y = 26 + i * 40, c = i === 0 || i === 6 ? C.orange : (i === 3 ? C.green : C.blue);
        s += F.num(34, y, String(i + 1), { c: c }) + t(56, y, k[0], { size: 15, b: 1, c: i === 3 ? C.green : C.ink }) + t(262, y, k[1], { size: 13, c: i === 3 ? C.green : C.sub, b: i === 3 ? 1 : 0 });
        if (i < 6) s += arrow(34, y + 13, 34, y + 27, { c: C.grayM, w: 1.6, head: 7 });
      });
      s += path('M440,226 C468,214 468,200 440,188', { c: C.red, w: 1.8 }) + F.arrow(446, 191, 438, 187, { c: C.red, w: 1.8, head: 8 });
      s += t(436, 206, '재시험', { size: 13, b: 1, c: C.red, a: 'e' });
      return F.svg(480, 296, s);
    });

  /* ═══════════ 05 감시 제어 · 통신 시험 ═══════════ */

  add('commTest', '감시 제어 시스템의 통신 — 설정 순서와 시험 순서, 그리고 통신이 안 될 때 아래 칸부터 짚는 법',
    function () {
      var s = '';
      function chips(y, ttl, arr, c, cl) {
        var o = t(16, y, ttl, { size: 14, b: 1, c: c }), x = 104, w = 88;
        arr.forEach(function (a, i) {
          o += box(x, y - 14, w - 10, 28, { fill: cl, c: c, r: 6, label: a, size: 13, lc: C.ink });
          if (i < arr.length - 1) o += arrow(x + w - 10, y, x + w, y, { c: c, w: 1.4, head: 6 });
          x += w;
        });
        return o;
      }
      s += chips(26, '설정 순서', ['IP 설정', '드라이버', '프로토콜', '통신 테스트'], C.blue, C.blueL);
      s += chips(66, '시험 순서', ['전원·배선', '통신 시험', '기능 시험', '결과 기록'], C.purple, C.purpleL);
      s += divH(92);
      s += t(16, 112, '통신이 안 될 때 — 아래 칸부터 확인', { size: 15, b: 1 });
      var L = [['케이블 · 전원 연결', C.grayL], ['IP 연결 — Ping 테스트', C.blueL], ['방화벽 — 통신 포트 허용', C.orangeL], ['프로토콜 설정', C.purpleL]];
      L.forEach(function (k, i) {
        var y = 272 - i * 34;
        s += box(40, y - 15, 220, 30, { fill: k[1], c: C.ink, r: 4, label: k[0], size: 14 });
      });
      s += box(40, 126, 220, 26, { fill: C.greenL, c: C.green, r: 4, label: '데이터 송수신 ✓', size: 14, lc: C.green });
      s += arrow(26, 278, 26, 130, { c: C.sub, w: 1.6, head: 9 });
      s += callout(262, 238, 300, 238, 'Ping 성공 = 여기까지 됨', { c: C.blue, tc: C.blue, b: 1, size: 13 });
      s += callout(262, 188, 300, 180, '그래도 데이터가 안 오면', { c: C.red, tc: C.red, b: 1, size: 13 }) +
        t(306, 198, '→ 포트 · 프로토콜 확인', { size: 13, c: C.red });
      return F.svg(480, 296, s);
    });

  add('noiseWiring', '노이즈를 막는 배선 — 전원선과 신호선은 떼어 놓고, 만나면 90°로, 차폐선은 한쪽만 접지, RS-422/485 는 양 끝에 종단 저항',
    function () {
      var s = divH(126) + divH(236);
      /* ① 분리 · 90° */
      s += t(16, 20, '① 떼어 놓고, 만나면 직각으로', { size: 15, b: 1 });
      s += line(30, 58, 450, 58, { c: C.red, w: 4 }) + t(34, 44, '전원선(강전) · 인버터 케이블', { size: 13, b: 1, c: C.red });
      s += line(30, 104, 300, 104, { c: C.blue, w: 2.2 }) + t(34, 117, '신호선 · 통신선', { size: 13, b: 1, c: C.blue });
      s += arrow(150, 64, 150, 98, { c: C.sub, w: 1.2, head: 7, both: true }) + t(158, 82, '거리를 둔다(같은 덕트 ✕)', { size: 13, c: C.ink });
      s += path('M300,104 H380 V36', { c: C.blue, w: 2.2 });
      s += box(372, 50, 16, 16, { fill: 'none', c: C.green, r: 0, w: 1.4 }) + t(394, 84, '90° 교차', { size: 13, b: 1, c: C.green });
      /* ② 차폐선 한쪽 접지 */
      s += t(16, 144, '② 차폐(실드)선은 제어반 쪽 한 끝만 접지', { size: 15, b: 1 });
      s += dev(20, 162, 70, 52, '제어반', C.ink, C.grayL, { size: 14 }) + dev(390, 162, 70, 52, '센서', C.ink, C.grayL, { size: 14 });
      s += box(110, 170, 260, 36, { fill: 'none', c: C.sub, r: 16, w: 1.6, dash: '5 4' });
      s += line(90, 182, 390, 182, { c: C.blue, w: 2 }) + line(90, 194, 390, 194, { c: C.blue, w: 2 });
      s += line(120, 206, 120, 216, { c: C.sub, w: 1.6 }) + gnd(120, 216, C.green) + t(136, 226, '접지', { size: 13, b: 1, c: C.green });
      s += t(370, 228, '이쪽은 접지 안 함', { size: 13, b: 1, c: C.red, a: 'e' });
      /* ③ 종단 저항 */
      s += t(16, 252, '③ RS-422/485 — 선 양 끝에 종단 저항(반사 방지)', { size: 15, b: 1 });
      s += line(70, 296, 410, 296, { c: C.blue, w: 2.2 }) + line(70, 316, 410, 316, { c: C.blue, w: 2.2 });
      [150, 240, 330].forEach(function (x) { s += dev(x - 22, 266, 44, 16, '', C.ink, C.grayL) + line(x - 6, 282, x - 6, 296, { w: 1.4 }) + line(x + 6, 282, x + 6, 316, { w: 1.4 }); });
      s += resV(70, 296, 316, { c: C.orange, a: 6, w: 2.2 }) + resV(410, 296, 316, { c: C.orange, a: 6, w: 2.2 });
      s += t(70, 332, '종단 저항', { size: 13, b: 1, c: C.orange, a: 'm' }) + t(410, 332, '종단 저항', { size: 13, b: 1, c: C.orange, a: 'm' });
      return F.svg(480, 346, s);
    });

  /* ═══════════ 07 안전 ═══════════ */

  add('sensGuard', '감응형(전자적) 방호 장치 — 라이트 커튼은 빛이 끊기면, 에어리어 스캐너는 레이저 구역에 들어오면, 안전 매트는 밟으면 로봇을 멈춘다. 안전 펜스는 물리적 방호',
    function () {
      var s = '';
      /* 펜스 */
      s += path('M40,200 V30 H440 V200', { c: C.ink, w: 4 }) + t(46, 22, '안전 펜스(방책) — 물리적 방호', { size: 13, b: 1 });
      s += line(40, 200, 170, 200, { c: C.ink, w: 4 }) + line(330, 200, 440, 200, { c: C.ink, w: 4 });
      /* 로봇 + 가동범위 */
      s += circ(250, 100, 56, { fill: C.grayL, c: C.grayM, w: 1.4, dash: '5 4' }) + robo(250, 116, 60, 20, C.ink, 1);
      /* 라이트 커튼 — 출입구 */
      s += box(164, 192, 10, 18, { fill: C.ink, c: C.ink, r: 2 }) + box(326, 192, 10, 18, { fill: C.ink, c: C.ink, r: 2 });
      [195, 201, 207].forEach(function (y) { s += line(174, y, 326, y, { c: C.red, w: 1.2 }); });
      s += callout(250, 207, 250, 236, '라이트 커튼 — 빛이 끊기면 정지', { c: C.red, tc: C.red, b: 1, a: 'm' });
      /* 에어리어 스캐너 */
      s += path('M64,54 L64,150 A96,96 0 0 0 150,60 Z', { c: C.orange, w: 1.2, fill: C.orangeL });
      s += path('M64,54 L64,110 A56,56 0 0 0 112,64 Z', { c: C.red, w: 1.2, fill: C.redL });
      s += box(56, 46, 16, 16, { fill: C.ink, c: C.ink, r: 3 });
      s += t(66, 168, '에어리어 스캐너', { size: 13, b: 1, c: C.orange }) + t(66, 184, '바깥 → 감속 · 안 → 정지', { size: 13, c: C.ink });
      /* 안전 매트 */
      s += F.hatch(346, 130, 80, 40, { gap: 7, c: C.green }) + box(346, 130, 80, 40, { fill: 'none', c: C.green, r: 2, w: 1.6 });
      s += t(386, 116, '안전 매트', { size: 13, b: 1, c: C.green, a: 'm' }) + t(386, 186, '밟으면 정지', { size: 13, c: C.ink, a: 'm' });
      return F.svg(480, 250, s);
    });

  add('signs', '안전보건표지 네 가지 — 금지(빨강 · 원 + 사선) · 경고(노랑 바탕 · 검은 테두리) · 지시(파랑 · 꼭 할 일) · 안내(초록 · 비상구 · 응급)',
    function () {
      var s = '', Y = '#facc15';
      /* 금지 */
      s += circ(60, 80, 38, { fill: '#fff', c: C.red, w: 8 }) + line(34, 54, 86, 106, { c: C.red, w: 8 });
      /* 경고 */
      s += poly([[180, 40], [224, 116], [136, 116]], { close: 1, fill: Y, c: C.ink, w: 5 }) + T(180, 94, '!', { size: 34, b: 1, halo: false });
      /* 지시 */
      s += circ(300, 80, 40, { fill: C.blue, c: C.blue, w: 1 }) + person(300, 58, '#fff', 1);
      /* 안내 */
      s += box(380, 40, 80, 80, { fill: C.green, c: C.green, r: 4 }) + box(410, 52, 20, 56, { fill: '#fff', c: '#fff', r: 0 }) + box(392, 70, 56, 20, { fill: '#fff', c: '#fff', r: 0 });
      [[60, '금지', C.red, '빨강 · 원 + 사선'], [180, '경고', C.ink, '노랑 · 검은 테두리'], [300, '지시', C.blue, '파랑 · 꼭 할 일'], [420, '안내', C.green, '초록 · 비상구·응급']]
        .forEach(function (k) { s += H(k[0], 148, k[1], { c: k[2] }) + S(k[0], 170, k[3], { c: C.ink }); });
      return F.svg(480, 190, s);
    });

  /* ═══════════ 08 제어 ═══════════ */

  add('anaDig', '아날로그와 디지털 — 아날로그는 연속 값이라 잡음이 그대로 섞이고, 디지털은 0 · 1 이라 문턱만 넘지 않으면 그대로 읽힌다',
    function () {
      var s = divV(240, 14, 222);
      s += H(120, 22, '아날로그 — 연속 신호', { c: C.orange, size: 15 });
      var p = sinePts(24, 196, 110, 44, 1.5);
      p = p.map(function (q, i) { return [q[0], q[1] + (i % 3 === 1 ? 4 : (i % 3 === 2 ? -3 : 0)) * (i > 40 && i < 70 ? 1.2 : 0.4)]; });
      s += line(24, 110, 220, 110, { c: C.edge, w: 1 }) + poly(p, { c: C.orange, w: 2 });
      s += callout(118, 150, 70, 182, '잡음이 값에 섞임', { c: C.red, tc: C.red, b: 1, size: 13, a: 'm' });
      s += S(120, 208, '예: 구형 온도조절기 전압 출력', { c: C.ink });
      s += H(360, 22, '디지털 — 0 과 1', { c: C.blue, size: 15 });
      var d = 'M260,150 H290 V70 H340 V150 H370 V70 H430 V150 H460';
      s += path(d, { c: C.blue, w: 2.4 });
      s += poly([[300, 70], [304, 66], [308, 75], [312, 67], [316, 72]], { c: C.red, w: 1.4 }) + poly([[380, 150], [384, 145], [388, 154], [392, 147]], { c: C.red, w: 1.4 });
      s += line(254, 110, 462, 110, { c: C.green, w: 1.4, dash: '6 4' }) + t(462, 124, '문턱', { size: 13, b: 1, c: C.green, a: 'e' });
      s += t(256, 64, '1', { size: 14, b: 1, c: C.blue }) + t(256, 156, '0', { size: 14, b: 1, c: C.blue });
      s += S(360, 178, '잡음이 문턱을 못 넘으면', { c: C.ink, b: 1 }) + S(360, 196, '그대로 읽힌다 → 강함', { c: C.ink, b: 1 }) + S(360, 214, '예: PLC', { c: C.ink });
      return F.svg(480, 226, s);
    });

  /* ═══════════ 09 HMI ═══════════ */

  add('hpHmi', 'HMI 화면의 색 — 모든 것을 같은 색으로 칠하면 이상이 안 보인다. 밝은 회색 바탕에 이상만 색(정상 녹 · 경고 황 · 위험 적)',
    function () {
      var s = '', Y = '#facc15';
      function screen(x, ttl, good) {
        var o = t(x, 22, ttl, { size: 14, b: 1, c: good ? C.green : C.red });
        o += box(x, 34, 210, 140, { fill: good ? '#e5e7eb' : '#1f2937', c: C.ink, r: 6, w: 2 });
        for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) {
          var bx = x + 12 + c * 49, by = 48 + r * 40, alarm = r === 1 && c === 2, warn = r === 2 && c === 0;
          var f = good ? (alarm ? C.red : (warn ? Y : '#cbd5e1')) : C.blue;
          o += box(bx, by, 40, 28, { fill: f, c: good ? '#94a3b8' : C.blue, r: 4, w: 1 });
        }
        return o;
      }
      s += screen(16, '✕ 모두 같은 색 — 이상이 묻힌다', false);
      s += screen(254, '○ 회색 바탕 — 이상만 색', true);
      s += callout(384, 108, 420, 196, '위험', { c: C.red, tc: C.red, b: 1, size: 13 });
      [[110, C.green, '정상'], [200, Y, '경고'], [290, C.red, '위험']].forEach(function (k) {
        s += circ(k[0], 222, 10, { fill: k[1], c: C.ink, w: 1.2 }) + t(k[0] + 16, 222, k[2], { size: 14, b: 1 });
      });
      s += t(16, 222, '상태 색', { size: 13, c: C.sub });
      return F.svg(480, 244, s);
    });

  /* ═══════════ 10 전기·전자 ═══════════ */

  add('meterConn', '멀티미터 연결 — 전압은 재는 곳에 병렬로, 전류는 회로를 끊고 그 사이에 직렬로, 저항은 전원을 끄고 잰다',
    function () {
      var s = divV(160, 14, 236) + divV(320, 14, 236);
      function batt(x, y1, y2, off) {
        var m = (y1 + y2) / 2, c = off ? C.grayM : C.ink;
        return line(x, y1, x, m - 6, { c: c, w: 1.8 }) + line(x - 12, m - 6, x + 12, m - 6, { c: c, w: 2.2 }) + line(x - 6, m + 4, x + 6, m + 4, { c: c, w: 3 }) +
          line(x, m + 4, x, y2, { c: c, w: 1.8 }) + t(x - 16, m - 8, '+', { size: 13, b: 1, c: c, a: 'm' });
      }
      function meter(x, y, k, c) { return circ(x, y, 15, { fill: '#fff', c: c, w: 2.2 }) + T(x, y, k, { size: 15, b: 1, c: c, halo: false }); }
      [['전압 — 병렬', 'V', C.blue], ['전류 — 직렬', 'A', C.orange], ['저항 — 전원 끄고', 'Ω', C.green]].forEach(function (k, i) {
        var x0 = i * 160, xb = x0 + 28, xr = x0 + 96, yt = 70, yb = 170, c = k[2];
        s += H(x0 + 80, 26, k[0], { c: c, size: 15 });
        s += batt(xb, yt, yb, i === 2);
        if (i === 1) {
          s += line(xb, yt, xb + 22, yt, { w: 1.8 }) + meter(xb + 37, yt, 'A', c) + line(xb + 52, yt, xr, yt, { w: 1.8 });
        } else s += line(xb, yt, xr, yt, { w: 1.8, c: i === 2 ? C.grayM : C.ink });
        s += line(xr, yt, xr, yt + 22, { w: 1.8 }) + resV(xr, yt + 22, yb - 22, {}) + line(xr, yb - 22, xr, yb, { w: 1.8 }) + line(xb, yb, xr, yb, { w: 1.8, c: i === 2 ? C.grayM : C.ink });
        if (i !== 1) {
          s += line(xr, yt + 16, xr + 34, yt + 16, { c: c, w: 1.6 }) + line(xr, yb - 16, xr + 34, yb - 16, { c: c, w: 1.6 });
          s += line(xr + 34, yt + 16, xr + 34, 105, { c: c, w: 1.6 }) + line(xr + 34, 135, xr + 34, yb - 16, { c: c, w: 1.6 }) + meter(xr + 34, 120, k[1], c);
        }
        if (i === 2) s += T(xb, 120, '✕', { size: 22, b: 1, c: C.red });
      });
      s += S(80, 200, '재는 부품 양 끝에', { c: C.ink }) + S(80, 218, '나란히 댄다', { c: C.ink });
      s += S(240, 200, '선을 끊고', { c: C.ink }) + S(240, 218, '그 사이에 끼운다', { c: C.ink });
      s += S(400, 200, '전원을 끊고(무전원)', { c: C.ink }) + S(400, 218, '부품 양 끝에', { c: C.ink });
      return F.svg(480, 236, s);
    });

  add('colorBand', '저항 색띠 읽기(5색띠) — 숫자 셋 + 승수 + 허용오차. 노랑 4 · 보라 7 · 검정 0 × 갈색 10 = 4,700Ω, 갈색 ±1% (값은 예시)',
    function () {
      var s = line(24, 86, 456, 86, { c: C.grayM, w: 4 });
      s += box(104, 52, 272, 68, { fill: '#e7d3a8', c: '#a8885a', r: 30, w: 2 });
      var bands = [[146, '#eab308', '4', '숫자'], [182, '#7c3aed', '7', '숫자'], [218, '#111827', '0', '숫자'], [262, '#8b4513', '×10', '승수'], [334, '#8b4513', '±1%', '허용오차']];
      bands.forEach(function (b) {
        s += box(b[0] - 9, 52, 18, 68, { fill: b[1], c: 'none', r: 0, w: 0 });
        s += T(b[0], 144, b[2], { size: 16, b: 1 }) + T(b[0], 166, b[3], { size: 13, c: C.sub });
      });
      s += t(146, 30, '읽는 방향 →', { size: 13, c: C.sub });
      s += T(240, 206, '4 7 0 × 10 = 4,700Ω = 4.7kΩ  ±1%', { size: 16, b: 1, c: C.blue });
      return F.svg(480, 226, s);
    });

  add('ripple', '정류와 평활 — 교류를 정류하면 혹 모양, 커패시터로 평활하면 거의 직류가 되고 조금 남는 물결이 리플 전압',
    function () {
      var s = '';
      function blk(x, lab, c, w) { return box(x, 18, w || 86, 32, { fill: '#fff', c: c, r: 6, label: lab, size: 14, lc: c }); }
      s += poly(sinePts(16, 50, 34, 12, 1.5), { c: C.sub, w: 2 }) + t(41, 62, '교류', { size: 13, c: C.sub, a: 'm' });
      s += arrow(70, 34, 100, 34, { c: C.sub, w: 1.6, head: 8 }) + blk(102, '정류', C.ink);
      s += arrow(188, 34, 210, 34, { c: C.sub, w: 1.6, head: 8 }) + blk(212, '평활 커패시터', C.blue, 116);
      s += arrow(328, 34, 348, 34, { c: C.sub, w: 1.6, head: 8 }) + t(352, 34, '직류(리플 조금)', { size: 14, b: 1, c: C.orange });
      var x0 = 40, y0 = 232, W = 410, A = 120;
      s += axes(x0, y0, W + 14, 150, '시간', '전압');
      var hp = [], sp = [], prev = 0;
      for (var i = 0; i <= 210; i++) {
        var u = i / 210, h = A * Math.abs(Math.sin(Math.PI * 3 * u)), v = Math.max(h, prev - 0.55);
        hp.push([x0 + W * u, y0 - h]); sp.push([x0 + W * u, y0 - v]); prev = v;
      }
      s += poly(hp, { c: C.grayM, w: 1.8, dash: '5 4' }) + poly(sp, { c: C.orange, w: 2.6 });
      s += t(250, 246, '점선 = 정류만 한 모양', { size: 13, c: C.sub, a: 'm' });
      var ym = y0 - A, yl = y0 - A + 0.55 * 66;
      s += arrow(318, ym, 318, yl + 2, { c: C.red, w: 1.2, head: 6, both: true }) + t(326, ym + 16, '리플 전압', { size: 13, b: 1, c: C.red });
      return F.svg(480, 258, s);
    });

  add('diode', '다이오드 — 순방향(애노드 +)에 약 0.7V(0.5~0.8V) 넘게 걸리면 전류가 흐르고, 역방향은 막는다',
    function () {
      var s = '';
      /* 기호 */
      s += line(20, 60, 80, 60, { w: 2 }) + poly([[80, 44], [80, 76], [110, 60]], { close: 1, fill: C.ink, c: C.ink }) + line(110, 44, 110, 76, { w: 3 }) + line(110, 60, 170, 60, { w: 2 });
      s += T(60, 30, '애노드(A)', { size: 13, b: 1 }) + T(130, 92, '캐소드(K)', { size: 13, b: 1 });
      s += arrow(40, 108, 150, 108, { c: C.green, w: 2, head: 9 }) + T(95, 124, '순방향 — 흐른다', { size: 13, b: 1, c: C.green });
      s += arrow(150, 150, 40, 150, { c: C.red, w: 2, head: 9 }) + T(95, 166, '역방향 — 막는다', { size: 13, b: 1, c: C.red });
      /* 특성 곡선 */
      var ox = 300, oy = 196;
      s += arrow(196, oy, 466, oy, { c: C.sub, w: 1.4, head: 9 }) + arrow(ox, 214, ox, 26, { c: C.sub, w: 1.4, head: 9 });
      s += t(466, oy + 16, '전압', { size: 13, c: C.sub, a: 'e' }) + t(ox + 8, 30, '전류', { size: 13, c: C.sub });
      var p = [];
      for (var v = 0; v <= 0.84; v += 0.02) p.push([ox + v * 160, oy - Math.min(160, 2 * Math.exp((v - 0.62) / 0.045))]);
      s += poly(p, { c: C.green, w: 2.6 }) + line(206, oy - 1, ox, oy - 1, { c: C.red, w: 2.6 });
      s += line(ox + 112, oy, ox + 112, 40, { c: C.grayM, w: 1.2, dash: '4 4' }) + T(ox + 112, 30, '약 0.7V', { size: 13, b: 1, c: C.green });
      s += t(204, oy - 14, '역방향 ≈ 0', { size: 13, b: 1, c: C.red });
      return F.svg(480, 226, s);
    });

  add('esd', '정전기(ESD) 방지 — 손목밴드와 매트를 접지해 몸과 작업대의 정전기를 천천히 흘려 보낸다. 손목밴드 속 약 1MΩ 은 감전을 막는 저항',
    function () {
      var s = '';
      s += box(150, 150, 300, 12, { fill: C.grayM, c: C.ink, r: 2 }) + box(150, 140, 300, 10, { fill: C.greenL, c: C.green, r: 2 });
      s += line(170, 162, 170, 212, { w: 3 }) + line(430, 162, 430, 212, { w: 3 });
      s += t(310, 130, '정전기 방지 매트 10⁶~10⁹ Ω/sq', { size: 13, b: 1, c: C.green, a: 'm' });
      s += person(96, 66, C.ink, 1.9);
      s += box(108, 90, 14, 10, { fill: C.blue, c: C.blue, r: 3 }) + t(66, 100, '손목밴드', { size: 13, b: 1, c: C.blue, a: 'e' });
      s += path('M118,100 C130,140 150,160 200,176', { c: C.blue, w: 1.6, dash: '3 3' });
      s += box(200, 168, 56, 18, { fill: '#fff', c: C.orange, r: 3, label: '1MΩ', size: 13, lc: C.orange });
      s += line(256, 177, 300, 177, { c: C.ink, w: 1.6 }) + line(300, 177, 300, 202, { w: 1.6 }) + gnd(300, 202, C.ink);
      s += line(440, 145, 460, 145, { c: C.green, w: 1.6 }) + line(460, 145, 460, 202, { c: C.green, w: 1.6 }) + line(300, 202, 460, 202, { c: C.green, w: 1.6 });
      s += t(312, 226, '공통 접지', { size: 13, b: 1 }) + t(228, 202, '감전 방지용 저항', { size: 13, c: C.orange, a: 'm' });
      s += t(186, 36, '몸에 쌓인 정전기를 땅으로 천천히', { size: 14, b: 1 }) + t(186, 56, '사용 전마다 손목밴드 점검', { size: 13, c: C.sub });
      return F.svg(480, 240, s);
    });

  add('solder', '납땜 모양 — 좋은 납땜은 오목하고 매끈, 냉납은 둥글게 뭉쳐 거칠고, 브리지는 이웃 패드와 붙어 단락된다 (모양은 개념, 인두 250~350℃)',
    function () {
      var s = divV(160, 14, 206) + divV(320, 14, 206);
      function board(x) { return box(x + 14, 136, 132, 16, { fill: C.greenL, c: C.green, r: 2 }); }
      function pad(x) { return box(x - 20, 130, 40, 6, { fill: C.orange, c: C.orange, r: 1 }); }
      function lead(x) { return line(x, 60, x, 160, { c: C.sub, w: 4 }); }
      var G = '#9ca3af';
      /* 좋은 */
      s += board(0) + pad(80) + lead(80) + path('M58,130 C74,124 76,100 80,84 C84,100 86,124 102,130 Z', { fill: G, c: C.ink, w: 1.4 });
      s += H(80, 26, '좋은 납땜', { c: C.green, size: 15 }) + S(80, 176, '오목하고 매끈하다', { c: C.ink, b: 1 });
      /* 냉납 */
      s += board(160) + pad(240) + lead(240) + path('M222,128 C206,120 210,96 226,92 C236,82 252,86 256,96 C270,104 266,124 252,128 Z', { fill: G, c: C.ink, w: 1.4 });
      s += line(222, 128, 230, 132, { c: C.red, w: 1.6 }) + poly([[230, 100], [236, 106], [232, 112]], { c: C.red, w: 1.2 });
      s += H(240, 26, '냉납(콜드 조인트)', { c: C.red, size: 15 }) + S(240, 176, '둥글게 뭉치고 거칠다', { c: C.ink, b: 1 }) + S(240, 194, '→ 접촉 불량', { c: C.red });
      /* 브리지 */
      s += board(320) + pad(370) + pad(430) + lead(370) + lead(430);
      s += path('M352,130 C356,110 368,104 380,108 C390,116 410,116 420,108 C432,104 444,110 448,130 Z', { fill: G, c: C.ink, w: 1.4 });
      s += H(400, 26, '브리지', { c: C.red, size: 15 }) + S(400, 176, '이웃 패드와 붙었다', { c: C.ink, b: 1 }) + S(400, 194, '→ 단락 · 납 과다', { c: C.red });
      return F.svg(480, 210, s);
    });

  /* ═══════════ 12 모터 ═══════════ */

  add('dcWinding', '직류 전동기 — 계자 권선을 전기자에 어떻게 잇느냐로 나눈다. 분권(병렬) · 직권(직렬) · 타여자(따로 전원) · 복권(직렬 + 병렬)',
    function () {
      var s = divV(240, 14, 336) + divH(176);
      function arm(x, y) { return circ(x, y, 15, { fill: '#fff', c: C.blue, w: 2.2 }) + T(x, y, 'A', { size: 14, b: 1, c: C.blue, halo: false }); }
      function sup(x, y1, y2) { return circ(x, y1, 4, { fill: '#fff', c: C.ink, w: 1.6 }) + circ(x, y2, 4, { fill: '#fff', c: C.ink, w: 1.6 }) + t(x - 8, y1, '+', { size: 14, b: 1, a: 'e' }) + t(x - 8, y2, '−', { size: 14, b: 1, a: 'e' }); }
      function txt(x, y, a, b, c) { return T(x, y, a, { size: 13, b: 1, c: c || C.ink }) + T(x, y + 18, b, { size: 13, c: C.sub }); }
      var FC = C.orange;
      /* 분권 */
      s += H(120, 24, '분권 — 병렬', { size: 15 });
      s += sup(40, 54, 128) + line(44, 54, 190, 54, { w: 1.8 }) + line(44, 128, 190, 128, { w: 1.8 });
      s += line(110, 54, 110, 70, { w: 1.8 }) + coilV(110, 70, 112, { c: FC, w: 2 }) + line(110, 112, 110, 128, { w: 1.8 }) + t(124, 90, 'F', { size: 14, b: 1, c: FC });
      s += line(180, 54, 180, 76, { w: 1.8 }) + arm(180, 91) + line(180, 106, 180, 128, { w: 1.8 });
      s += txt(120, 146, '속도 변동이 작다', '공작기계 · 압연기');
      /* 직권 */
      s += H(360, 24, '직권 — 직렬', { size: 15 });
      s += sup(280, 54, 128) + line(284, 54, 310, 54, { w: 1.8 }) + coilH(310, 54, 370, { c: FC, w: 2 }) + t(340, 38, 'F', { size: 14, b: 1, c: FC, a: 'm' });
      s += line(370, 54, 420, 54, { w: 1.8 }) + line(420, 54, 420, 76, { w: 1.8 }) + arm(420, 91) + line(420, 106, 420, 128, { w: 1.8 }) + line(284, 128, 420, 128, { w: 1.8 });
      s += txt(360, 146, '부하↑ 속도↓ · 무부하 위험', '드릴 · 그라인더');
      /* 타여자 */
      s += H(120, 190, '타여자 — 따로 전원', { size: 15 });
      s += sup(40, 220, 290) + line(44, 220, 90, 220, { w: 1.8 }) + line(90, 220, 90, 240, { w: 1.8 }) + arm(90, 255) + line(90, 270, 90, 290, { w: 1.8 }) + line(44, 290, 90, 290, { w: 1.8 });
      s += sup(160, 220, 290) + line(164, 220, 200, 220, { w: 1.8 }) + line(200, 220, 200, 234, { w: 1.8 }) + coilV(200, 234, 276, { c: FC, w: 2 }) + line(200, 276, 200, 290, { w: 1.8 }) + line(164, 290, 200, 290, { w: 1.8 });
      s += t(214, 255, 'F', { size: 14, b: 1, c: FC });
      s += txt(120, 312, '계자 · 전압 제어 다 됨', '속도 제어 범위가 넓다');
      /* 복권 */
      s += H(360, 190, '복권 — 직렬 + 병렬', { size: 15 });
      s += sup(280, 220, 290) + line(284, 220, 300, 220, { w: 1.8 }) + coilH(300, 220, 344, { c: FC, w: 2 }) + line(344, 220, 440, 220, { w: 1.8 });
      s += line(380, 220, 380, 234, { w: 1.8 }) + coilV(380, 234, 276, { c: FC, w: 2 }) + line(380, 276, 380, 290, { w: 1.8 });
      s += line(440, 220, 440, 240, { w: 1.8 }) + arm(440, 255) + line(440, 270, 440, 290, { w: 1.8 }) + line(284, 290, 440, 290, { w: 1.8 });
      s += txt(360, 312, '가동: 토크 크고 무부하 안전', '차동: 역회전 위험');
      return F.svg(480, 340, s);
    });

  /* ═══════════ 13 공압 ═══════════ */

  add('gasLaws', '보일 · 샤를의 법칙 — 온도가 일정하면 압력과 부피는 반비례, 압력이 일정하면 부피는 절대온도(K)에 비례',
    function () {
      var s = divV(240, 14, 236);
      s += H(120, 22, '보일 — 온도 일정', { c: C.blue, size: 15 }) + S(120, 42, 'P × V = 일정 (반비례)', { c: C.ink, b: 1 });
      s += axes(40, 210, 186, 150, 'V 부피', 'P 압력');
      var p = [];
      for (var v = 0.2; v <= 1.0001; v += 0.02) p.push([40 + 170 * v, 210 - 26 / v]);
      s += poly(p, { c: C.blue, w: 2.6 });
      s += dot(40 + 170 * 0.3, 210 - 26 / 0.3, 4, C.blue) + dot(40 + 170 * 0.8, 210 - 26 / 0.8, 4, C.blue);
      s += t(100, 104, '누르면(V↓) 압력↑', { size: 13, c: C.blue, b: 1 });
      s += H(360, 22, '샤를 — 압력 일정', { c: C.orange, size: 15 }) + S(360, 42, 'V ∝ T (절대온도에 비례)', { c: C.ink, b: 1 });
      s += axes(280, 210, 186, 150, 'T (K)', 'V 부피');
      s += line(280, 210, 330, 168, { c: C.orange, w: 1.6, dash: '5 4' }) + line(330, 168, 450, 68, { c: C.orange, w: 2.6 });
      s += t(286, 224, '0K', { size: 13, b: 1, c: C.orange, a: 'm' }) + t(400, 140, '데우면 부피↑', { size: 13, b: 1, c: C.orange, a: 'm' });
      return F.svg(480, 236, s);
    });

  add('compressors', '공기 압축기의 종류 — 용적형은 공기를 가두고 부피를 줄이고, 터보형은 날개를 빨리 돌려 속도를 압력으로 바꾼다 (토출 압력 9.8 N/cm² 이상이 압축기, 미만은 송풍기)',
    function () {
      var s = '';
      function node(x, y, a, c, cl) { return box(x - 46, y - 14, 92, 28, { fill: cl, c: c, r: 6, label: a, size: 14, lc: c }); }
      function br(x1, y1, x2, y2) { return path('M' + x1 + ',' + y1 + ' V' + ((y1 + y2) / 2) + ' H' + x2 + ' V' + y2, { c: C.grayM, w: 1.6 }); }
      s += node(240, 22, '공기 압축기', C.ink, C.grayL);
      s += br(240, 36, 140, 60) + br(240, 36, 400, 60);
      s += node(140, 74, '용적형', C.blue, C.blueL) + node(400, 74, '터보형', C.orange, C.orangeL);
      s += S(140, 102, '가두고 부피를 줄인다', { c: C.blue, b: 1 }) + S(400, 102, '날개 회전 → 속도 → 압력', { c: C.orange, b: 1 });
      s += br(140, 110, 79, 128) + br(140, 110, 235, 128);
      s += T(79, 136, '왕복식', { size: 14, b: 1 }) + T(235, 136, '회전식', { size: 14, b: 1 });
      s += br(79, 146, 40, 162) + br(79, 146, 118, 162) + br(235, 146, 196, 162) + br(235, 146, 274, 162) + br(400, 110, 358, 162) + br(400, 110, 440, 162);
      var ic = 196;
      /* 아이콘 */
      s += F.g(box(30, ic - 18, 28, 30, { fill: '#fff', c: C.ink, r: 2 }) + box(32, ic - 6, 24, 6, { fill: C.sub, c: C.sub, r: 0 }) + line(44, ic, 44, ic + 18, { w: 3 }), { x: -4 });
      s += F.g(box(106, ic - 18, 28, 30, { fill: '#fff', c: C.ink, r: 2 }) + path('M108,' + (ic - 2) + ' q6,-8 12,0 t12,0', { c: C.purple, w: 2 }), { x: -2 });
      s += F.g(circ(164, ic, 15, { fill: '#fff', c: C.ink, w: 1.8 }) + circ(168, ic, 9, { fill: C.grayL, c: C.ink, w: 1.2 }) + line(168, ic - 9, 168, ic - 15, { w: 1.6 }) + line(168, ic + 9, 168, ic + 15, { w: 1.6 }) + line(159, ic, 150, ic, { w: 1.6 }), { x: 32 });
      s += F.g(circ(232, ic, 10, { fill: '#fff', c: C.ink, w: 1.6 }) + circ(250, ic, 10, { fill: '#fff', c: C.ink, w: 1.6 }) + path('M225,' + (ic - 6) + ' L239,' + (ic + 6) + ' M243,' + (ic - 6) + ' L257,' + (ic + 6), { w: 1.4 }), { x: 33 });
      s += F.g(line(318, ic, 362, ic, { w: 2.4 }) + [326, 338, 350].map(function (x) { return line(x, ic - 12, x + 6, ic + 12, { c: C.orange, w: 2 }); }).join('') + arrow(318, ic + 20, 362, ic + 20, { c: C.orange, w: 1.4, head: 7 }), { x: 18 });
      s += circ(440, ic, 13, { fill: '#fff', c: C.ink, w: 1.6 }) + arrow(440, ic, 440, ic - 26, { c: C.orange, w: 1.4, head: 7 }) + arrow(440, ic, 464, ic, { c: C.orange, w: 1.4, head: 7 }) + arrow(440, ic, 418, ic + 16, { c: C.orange, w: 1.4, head: 7 });
      var leaf = [[40, '피스톤', '소형 공랭', '중대형 수냉'], [118, '다이어프램', '기름 안 닿음', '식품·제약'], [196, '베인', '맥동·소음', '적다'], [274, '나사', '열 덜 남', '무급유 가능'], [358, '축류식', '축 방향', '여러 단'], [440, '반경류식', '바깥(원심)', '방향으로']];
      leaf.forEach(function (k, i) {
        var x = k[0];
        s += T(x, 234, k[1], { size: 14, b: 1 }) + T(x, 252, k[2], { size: 13, c: C.sub }) + T(x, 268, k[3], { size: 13, c: C.sub });
      });
      return F.svg(480, 282, s);
    });

  add('cylSD', '단동과 복동 실린더 — 단동은 한쪽만 공기로 밀고 스프링으로 돌아오며(한 방향 일), 복동은 전진 · 후진 모두 공기로 움직인다',
    function () {
      var s = divH(124);
      function body(y) { return box(70, y, 240, 52, { fill: C.grayM, c: C.ink, r: 3, w: 2 }) + box(76, y + 6, 228, 40, { fill: '#fff', c: C.ink, r: 1, w: 1 }); }
      function spring(x1, x2, y) { var p = [[x1, y]], n = 10; for (var i = 1; i < n; i++) p.push([x1 + (x2 - x1) * i / n, y + (i % 2 ? -14 : 14)]); p.push([x2, y]); return poly(p, { c: C.ink, w: 1.6 }); }
      function port(x, y, c, lab) { return line(x, y, x, y - 18, { c: c, w: 3 }) + arrow(x, y - 34, x, y - 6, { c: c, w: 2, head: 8 }) + t(x + 8, y - 30, lab, { size: 13, b: 1, c: c }); }
      /* 단동 */
      var y = 52;
      s += t(16, 20, '단동 실린더', { size: 15, b: 1, c: C.orange });
      s += body(y) + box(76, y + 6, 74, 40, { fill: C.blueL, c: 'none', r: 0, w: 0 }) + box(150, y + 6, 12, 40, { fill: C.sub, c: C.ink, r: 1, w: 1.2 }) + box(162, y + 20, 226, 12, { fill: C.grayM, c: C.ink, r: 1, w: 1.4 });
      s += spring(164, 302, y + 26) + port(124, y, C.blue, '공기');
      s += t(330, y + 4, '스프링으로', { size: 13, b: 1, c: C.orange }) + t(330, y + 52, '돌아온다', { size: 13, b: 1, c: C.orange });
      s += t(190, 120, '공기는 한쪽만 → 한 방향으로만 일을 한다', { size: 13, c: C.ink, a: 'm' });
      /* 복동 */
      y = 176;
      s += t(16, 144, '복동 실린더', { size: 15, b: 1, c: C.blue });
      s += body(y) + box(76, y + 6, 104, 40, { fill: C.blueL, c: 'none', r: 0, w: 0 }) + box(180, y + 6, 12, 40, { fill: C.sub, c: C.ink, r: 1, w: 1.2 }) + box(192, y + 20, 226, 12, { fill: C.grayM, c: C.ink, r: 1, w: 1.4 });
      s += port(124, y, C.blue, '전진 공기') + port(286, y, C.purple, '후진 공기');
      s += t(190, 248, '전진 · 후진 모두 공기 → 자동화에 가장 널리', { size: 13, c: C.ink, a: 'm' });
      return F.svg(480, 262, s);
    });

})();
/*@@END NEW@@*/

/*@@COPY — build_figs.py 가 채운다. 손대지 말 것@@*/
var FIGS_SRC = {};
/* ── 복사본: 스마트공장 마스터/figs.js ── */
FIGS_SRC.M = (function () {
/* ══════════════════════════════════════════════════════════════
   스마트공장기능사 마스터 — 그림 모음 (그림22 · 2026-10-01)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기 카드) · lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['카드 제목'…], draw:function(){ … } }
       cards — data/learn/chNN.js 의 카드 제목(t)과 **똑같이**. 그 카드의 요약 줄 아래에 그림이 붙는다.
               같은 챕터에서 이미 나온 그림은 「🖼️ 그림 보기」 단추로만 붙는다(index.html).
     순서 = 챕터 순서.

   그림 내용은 배우기 카드(data/learn) 본문과 교재 전사본(_작업/스마트공장 전사/_src/이론/)을 보고 새로 짠 것이다.
   교재 그림을 따라 그리지 않았다. 카드·교재에 없는 수치는 넣지 않았다(예시 숫자는 캡션에 「예시」).
   정답 이름표 — 슬라이드 빈칸의 답이 되는 글자는 ans:true 로 그려 두고, 슬라이드에서는 labels:false 로 가린다.
   ══════════════════════════════════════════════════════════════ */
return (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, callout = F.callout, poly = F.poly, path = F.path;
  var R = {};
  function add(key, cards, cap, draw) { R[key] = { cards: cards, cap: cap, draw: draw }; }

  /* ── 작은 도우미 ─────────────────────────── */
  function T(x, y, s, o) { o = o || {}; if (o.a == null) o.a = 'm'; return t(x, y, s, o); }
  function S(x, y, s, o) { o = o || {}; o.size = o.size || 13; o.c = o.c || C.sub; if (o.a == null) o.a = 'm'; return t(x, y, s, o); }
  function dev(x, y, w, h, label, col, fill, o) {
    o = o || {};
    return box(x, y, w, h, { fill: fill || C.grayL, c: col || C.ink, label: label, size: o.size || 15, lc: o.lc || col || C.ink, b: o.b, r: o.r, ans: o.ans });
  }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3) + '" fill="' + (c || C.ink) + '"/>'; }
  function ell(cx, cy, rx, ry, o) {
    o = o || {};
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (o.fill || 'none') +
      '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w || 1.6) + '"' + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + '/>';
  }
  function circ(cx, cy, r, o) { return F.circle(cx, cy, r, o || {}); }
  /* 정답 이름표인데 슬라이드(labels:false)에서 ? 대신 다른 표지(㉮ 등)를 보이고 싶을 때 */
  function alt(x, y, s, mark, o) {
    o = o || {};
    return '<g class="fig-ans">' + t(x, y, s, o) + '</g>' + '<g class="fig-q">' + t(x, y, mark, { size: (o.size || 16) + 4, b: 1, c: o.c, a: o.a }) + '</g>';
  }
  /* 사인 곡선 점들 — x0 부터 w 만큼, cycles 번 떨림 */
  function sinePts(x0, w, cy, amp, cycles, phase) {
    var p = [], k = Math.max(8, Math.round(w / 2));
    for (var i = 0; i <= k; i++) { var u = i / k; p.push([x0 + w * u, cy - amp * Math.sin(2 * Math.PI * cycles * u + (phase || 0))]); }
    return p;
  }
  function cloud(cx, cy, w, h, o) {
    o = o || {};
    var rx = w / 2, ry = h / 2;
    var d = 'M' + (cx - rx * 0.7) + ',' + (cy + ry * 0.6) +
      ' C' + (cx - rx * 1.15) + ',' + (cy + ry * 0.6) + ' ' + (cx - rx * 1.1) + ',' + (cy - ry * 0.4) + ' ' + (cx - rx * 0.6) + ',' + (cy - ry * 0.35) +
      ' C' + (cx - rx * 0.5) + ',' + (cy - ry * 1.1) + ' ' + (cx + rx * 0.3) + ',' + (cy - ry * 1.15) + ' ' + (cx + rx * 0.35) + ',' + (cy - ry * 0.45) +
      ' C' + (cx + rx * 1.1) + ',' + (cy - ry * 0.7) + ' ' + (cx + rx * 1.2) + ',' + (cy + ry * 0.6) + ' ' + (cx + rx * 0.7) + ',' + (cy + ry * 0.6) + ' Z';
    return path(d, { fill: o.fill || C.grayL, c: o.c || C.sub, w: 1.6 }) + (o.label ? T(cx, cy + 4, o.label, { size: o.size || 15, b: 1, c: o.lc || C.ink, halo: false }) : '');
  }
  /* 그래프 축 — 원점(x0,y0), 가로 길이 w, 세로 길이 h */
  function axes(x0, y0, w, h, xl, yl, o) {
    o = o || {};
    var c = o.c || C.sub;
    return arrow(x0, y0, x0 + w, y0, { c: c, w: 1.4, head: 9 }) + arrow(x0, y0, x0, y0 - h, { c: c, w: 1.4, head: 9 }) +
      (xl ? t(x0 + w, y0 + 16, xl, { size: 13, c: c, a: 'e' }) : '') +
      (yl ? t(x0 + 8, y0 - h + 2, yl, { size: 13, c: c, a: 's' }) : '');
  }

  /* ═══════════ CH01 통신 네트워크 설치 ═══════════ */

  add('dataInfo', ['정보통신의 기본 개념', '스마트공장 시스템 데이터'],
    '데이터 → 정보 → 지식 → 의사 결정 — 가공하고 분석해야 판단에 쓸 수 있다',
    function () {
      var xs = [14, 130, 246, 362], tops = [164, 128, 92, 56], name = ['데이터', '정보', '지식', '의사 결정'],
        sub = [['78℃', '잰 값 그대로'], ['기준 70℃ 넘음', '→ 점검 필요'], ['쌓인 정보에서', '찾은 규칙'], ['무엇을 할지', '정한다']],
        fill = [C.grayL, C.blueL, C.blueL, C.orangeL], col = [C.sub, C.blue, C.blue, C.orange], via = ['가공', '분석', '판단'];
      var s = '';
      for (var i = 0; i < 4; i++) {
        s += box(xs[i], tops[i], 104, 252 - tops[i], { fill: fill[i], c: col[i] });
        s += T(xs[i] + 52, tops[i] + 22, name[i], { b: 1, c: i ? col[i] : C.ink, halo: false });
        s += S(xs[i] + 52, tops[i] + 48, sub[i][0], { c: C.ink, halo: false }) + S(xs[i] + 52, tops[i] + 66, sub[i][1], { c: C.ink, halo: false });
        if (i < 3) {
          s += arrow(xs[i] + 70, tops[i] - 12, xs[i + 1] + 34, tops[i + 1] - 12, { c: C.sub, w: 1.6, head: 9 });
          s += S(xs[i] + 104, tops[i] - 36, via[i], { b: 1 });
        }
      }
      return F.svg(480, 266, s);
    });

  add('protocol', ['프로토콜 — 통신의 약속'],
    '프로토콜의 세 요소 — 구문(형식) · 의미(값의 뜻) · 순서(언제·어떤 차례로)',
    function () {
      var s = dev(14, 64, 88, 70, '기계 A', C.ink, C.grayL) + dev(378, 64, 88, 70, '기계 B', C.ink, C.grayL);
      var cells = ['주소', '명령', '값', '끝'];
      for (var i = 0; i < 4; i++) s += dev(122 + i * 59, 70, 59, 30, cells[i], C.blue, i === 1 ? C.blueL : '#fff', { size: 14 });
      s += line(122, 58, 122, 64, { c: C.blue, w: 1.4 }) + line(122, 58, 358, 58, { c: C.blue, w: 1.4 }) + line(358, 58, 358, 64, { c: C.blue, w: 1.4 });
      s += F.num(240, 42, '①') + F.num(210, 116, '②', { c: C.orange });
      s += arrow(108, 124, 372, 124, { c: C.sub, w: 1.6, head: 9 }) + S(240, 138, '요청', { a: 'm' });
      s += arrow(372, 150, 108, 150, { c: C.sub, w: 1.6, head: 9 }) + S(240, 164, '응답');
      s += F.num(398, 150, '③', { c: C.green });
      s += t(24, 190, '① 구문 — 어떤 형식 · 구조로 쓰나', { size: 15 }) +
        t(24, 214, '② 의미 — 각 칸의 값이 무슨 뜻인가', { size: 15 }) +
        t(24, 238, '③ 순서 — 언제, 어떤 차례로, 얼마나 빠르게', { size: 15 });
      return F.svg(480, 256, s);
    });

  add('osi', ['OSI 7 계층 모델'],
    'OSI 7계층 — 아래 1 물리부터 위 7 응용까지, 층마다 대표 예와 그 층에서 일하는 장비',
    function () {
      var names = ['7 응용', '6 표현', '5 세션', '4 전송', '3 네트워크', '2 데이터링크', '1 물리'],
        ex = ['HTTP · FTP · SMTP', 'JPEG · MPEG · SSL', 'NetBIOS · RPC', 'TCP · UDP', 'IP · ICMP · ARP', 'Ethernet · Wi-Fi', '케이블'],
        devs = ['', '', '', '', '라우터', '스위치 · 브리지', '허브 · 리피터'];
      var s = t(226, 18, '대표 예', { size: 13, c: C.sub }) + t(466, 18, '장비', { size: 13, c: C.sub, a: 'e' });
      for (var i = 0; i < 7; i++) {
        var y = 32 + i * 31, up = i <= 2;
        s += box(16, y, 190, 26, { fill: up ? C.purpleL : C.blueL, c: up ? C.purple : C.blue, r: 6 }) +
          t(30, y + 13, names[i], { b: 1, c: up ? C.purple : C.blue, halo: false });
        s += t(226, y + 13, ex[i], { size: 15, ans: true });
        if (devs[i]) s += t(466, y + 13, devs[i], { size: 14, b: 1, c: C.orange, a: 'e', ans: true });
      }
      return F.svg(480, 256, s);
    });

  add('osiTcp', ['TCP/IP 4 계층과 OSI 비교'],
    'OSI 7계층(이론 모델)과 TCP/IP 4계층(실무 모델)이 어떻게 겹치나',
    function () {
      var names = ['7 응용', '6 표현', '5 세션', '4 전송', '3 네트워크', '2 데이터링크', '1 물리'];
      var s = T(100, 22, 'OSI (이론)', { b: 1, c: C.sub }) + T(372, 22, 'TCP/IP (실무)', { b: 1, c: C.blue });
      var y0 = 40, rh = 30;
      for (var i = 0; i < 7; i++) s += dev(24, y0 + i * rh, 152, 26, names[i], C.sub, C.grayL, { size: 14, r: 6 });
      var tcp = [[0, 3, '애플리케이션', 'HTTP · FTP · DNS'], [3, 1, '전송', 'TCP · UDP'], [4, 1, '인터넷', 'IP · ICMP'], [5, 2, '네트워크 접근', 'Ethernet · Wi-Fi']];
      tcp.forEach(function (r, k) {
        var ya = y0 + r[0] * rh, yb = ya + r[1] * rh - 4;
        s += poly([[176, ya], [270, ya], [270, yb], [176, yb]], { close: 1, fill: k % 2 ? C.blueL : C.purpleL, c: 'none', w: 0, op: 0.55 });
        s += box(270, ya, 196, yb - ya, { fill: '#fff', c: C.blue, r: 6 });
        if (r[1] > 1) { s += T(368, (ya + yb) / 2 - 10, r[2], { b: 1, c: C.blue, halo: false }) + S(368, (ya + yb) / 2 + 12, r[3], { halo: false }); }
        else s += t(282, (ya + yb) / 2, r[2], { b: 1, c: C.blue, halo: false }) + t(456, (ya + yb) / 2, r[3], { size: 13, c: C.sub, a: 'e', halo: false });
      });
      return F.svg(480, 262, s);
    });

  add('cables', ['전송선로 — 동축·트위스트 페어·광섬유'],
    '전송 선로 세 가지 — 동축(바깥 도체가 차폐) · 트위스트 페어(꼬아서 잡음↓) · 광섬유(빛으로)',
    function () {
      var s = '';
      /* 동축 — 단면 */
      s += circ(82, 104, 50, { fill: C.grayM, c: C.sub }) + circ(82, 104, 42, { fill: '#fff', c: C.orange, w: 3, dash: '4 3' }) +
        circ(82, 104, 36, { fill: C.yellowL, c: C.sub, w: 1 }) + circ(82, 104, 9, { fill: C.orange, c: C.orange });
      s += callout(82, 104, 40, 30, '중심 도체', { a: 's', size: 14 }) + callout(112, 76, 124, 34, '외부 도체(차폐)', { a: 's', size: 14 });
      /* 트위스트 페어 — 옆모습 */
      s += box(168, 74, 144, 60, { fill: C.grayL, c: C.sub, r: 22 });
      s += poly(sinePts(176, 128, 104, 17, 3.5, 0), { c: C.blue, w: 3.4 }) + poly(sinePts(176, 128, 104, 17, 3.5, Math.PI), { c: C.orange, w: 3.4 });
      /* 광섬유 — 옆모습, 빛이 안쪽에서 튕기며 나아감 */
      s += box(326, 72, 142, 64, { fill: C.blueL, c: C.blue, r: 10 }) + box(326, 90, 142, 28, { fill: '#fff', c: C.blue, w: 1, r: 0 });
      var zz = [[330, 104], [352, 92], [382, 116], [412, 92], [442, 116]];
      s += poly(zz, { c: C.orange, w: 2 }) + arrow(442, 116, 462, 100, { c: C.orange, w: 2, head: 9 });
      var nm = [['동축 케이블', '바깥 도체가 차폐'], ['트위스트 페어', '두 가닥을 꼬아 잡음↓'], ['광섬유', '빛으로 · 간섭 없음']], cx = [82, 240, 397];
      for (var i = 0; i < 3; i++) s += T(cx[i], 180, nm[i][0], { b: 1 }) + S(cx[i], 204, nm[i][1], { ans: true });
      return F.svg(480, 224, s);
    });

  add('lineCode', ['통신속도·대역폭과 전송 부호'],
    '같은 비트 1 0 1 1 0 — NRZ 는 1이 이어지면 평평, 맨체스터는 비트마다 가운데서 한 번 바뀐다(모양은 약속의 한 예)',
    function () {
      var b = [1, 0, 1, 1, 0], x0 = 110, cw = 70, s = '';
      for (var i = 0; i <= 5; i++) s += line(x0 + i * cw, 36, x0 + i * cw, 190, { c: C.grayM, w: 1, dash: '4 4' });
      for (i = 0; i < 5; i++) s += T(x0 + i * cw + cw / 2, 26, String(b[i]), { b: 1, size: 17 });
      /* NRZ */
      var hi = 60, lo = 98, p = [];
      for (i = 0; i < 5; i++) { var y = b[i] ? hi : lo; p.push([x0 + i * cw, y]); p.push([x0 + (i + 1) * cw, y]); }
      s += t(16, 80, 'NRZ', { b: 1 }) + poly(p, { c: C.blue, w: 2.6 });
      /* 맨체스터 — 1 은 아래→위, 0 은 위→아래 (가운데서 바뀜) */
      var h2 = 132, l2 = 170; p = [];
      for (i = 0; i < 5; i++) {
        var a = b[i] ? l2 : h2, c = b[i] ? h2 : l2, xm = x0 + i * cw + cw / 2;
        p.push([x0 + i * cw, a]); p.push([xm, a]); p.push([xm, c]); p.push([x0 + (i + 1) * cw, c]);
        s += dot(xm, (h2 + l2) / 2, 4, C.orange);
      }
      s += t(16, 144, '맨체스터', { b: 1 }) + S(16, 166, '자체 동기화', { a: 's' }) + poly(p, { c: C.green, w: 2.6 });
      s += S(240, 212, '● 비트 가운데의 바뀜 — 받는 쪽이 이것으로 박자를 찾는다', { c: C.ink });
      return F.svg(480, 230, s);
    });

  add('modulation', ['변조와 복조 — ASK·FSK·PSK·QAM'],
    '디지털 1 0 1 1 을 실어 보내기 — ASK 는 진폭, FSK 는 주파수, PSK 는 위상을 바꾼다',
    function () {
      var b = [1, 0, 1, 1], x0 = 120, cw = 84, s = '';
      for (var i = 0; i <= 4; i++) s += line(x0 + i * cw, 30, x0 + i * cw, 240, { c: C.grayM, w: 1, dash: '4 4' });
      for (i = 0; i < 4; i++) s += T(x0 + i * cw + cw / 2, 20, String(b[i]), { b: 1, size: 17 });
      var rows = [['디지털', ''], ['ASK', '진폭'], ['FSK', '주파수'], ['PSK', '위상']], cy = [58, 112, 166, 220];
      for (i = 0; i < 4; i++) { s += t(16, cy[i] - (rows[i][1] ? 9 : 0), rows[i][0], { b: 1 }); if (rows[i][1]) s += t(16, cy[i] + 12, rows[i][1], { size: 13, c: C.orange, b: 1, ans: true }); }
      var p = [];
      for (i = 0; i < 4; i++) { var y = b[i] ? cy[0] - 16 : cy[0] + 16; p.push([x0 + i * cw, y], [x0 + (i + 1) * cw, y]); }
      s += poly(p, { c: C.ink, w: 2.4 });
      var ask = [], fsk = [], psk = [];
      for (i = 0; i < 4; i++) {
        ask = ask.concat(sinePts(x0 + i * cw, cw, cy[1], b[i] ? 18 : 5, 2, 0));
        fsk = fsk.concat(sinePts(x0 + i * cw, cw, cy[2], 16, b[i] ? 4 : 2, 0));
        psk = psk.concat(sinePts(x0 + i * cw, cw, cy[3], 16, 2, b[i] ? 0 : Math.PI));
      }
      s += poly(ask, { c: C.blue, w: 2 }) + poly(fsk, { c: C.blue, w: 2 }) + poly(psk, { c: C.blue, w: 2 });
      return F.svg(480, 250, s);
    });

  add('dteDce', ['DTE와 DCE'],
    '연결 순서 — DTE(컴퓨터) → DCE(모뎀) → 통신 회선 → DCE → CCU(통신제어장치) → 호스트 컴퓨터',
    function () {
      var s = T(66, 36, 'DTE', { b: 1, c: C.blue }) + dev(16, 52, 100, 48, '컴퓨터', C.blue, C.blueL);
      s += arrow(116, 76, 146, 76, { w: 1.8, head: 9 });
      s += T(198, 36, 'DCE', { b: 1, c: C.orange }) + dev(148, 52, 100, 48, '모뎀', C.orange, C.orangeL);
      s += poly(sinePts(250, 84, 76, 6, 4, 0), { c: C.sub, w: 2 }) + S(292, 50, '통신 회선', { b: 1 });
      s += T(384, 36, 'DCE', { b: 1, c: C.orange }) + dev(334, 52, 100, 48, '모뎀', C.orange, C.orangeL);
      s += arrow(384, 100, 384, 138, { w: 1.8, head: 9 });
      s += dev(334, 140, 100, 48, '통신제어장치', C.ink, C.grayL, { size: 14 }) + S(384, 204, 'CCU', { b: 1 });
      s += arrow(334, 164, 250, 164, { w: 1.8, head: 9 });
      s += dev(148, 140, 100, 48, '호스트', C.ink, C.grayL);
      s += S(240, 236, 'DCE 가 하는 일 — 신호 변환 · 클록 제공 · 회선 제어 · 에러 검출', { c: C.ink });
      return F.svg(480, 254, s);
    });

  add('mux', ['다중화와 역다중화'],
    '다중화 — FDM 은 주파수 띠로, TDM 은 시간 칸으로 나눠 선 하나를 여럿이 쓴다',
    function () {
      var s = T(128, 22, 'FDM — 주파수로 나눔', { b: 1 }) + T(362, 22, 'TDM — 시간으로 나눔', { b: 1 });
      s += axes(40, 190, 196, 132, '시간', '주파수') + axes(266, 190, 200, 132, '시간', '주파수');
      var lab = ['A', 'B', 'C'], fl = [C.blueL, C.greenL, C.orangeL], cl = [C.blue, C.green, C.orange];
      for (var i = 0; i < 3; i++) s += box(52, 72 + i * 40, 170, 30, { fill: fl[i], c: cl[i], label: 'A B C'.split(' ')[i], lc: cl[i], r: 4 });
      for (i = 0; i < 6; i++) s += box(278 + i * 30, 72, 28, 110, { fill: fl[i % 3], c: cl[i % 3], label: lab[i % 3], lc: cl[i % 3], r: 3 });
      s += S(128, 218, '예 — 라디오 · TV') + S(362, 218, '예 — 디지털 통신');
      return F.svg(480, 234, s);
    });

  add('switching', ['교환 방식 — 회선·패킷·메시지'],
    '회선 교환은 전용 길을 통째로 잡아 두고, 패킷 교환은 조각이 제각각 길로 가서 도착한 뒤 다시 맞춘다',
    function () {
      function net(dy, hot) {
        var P = { A: [44, 72], n1: [170, 46], n2: [170, 100], n3: [310, 46], n4: [310, 100], B: [436, 72] };
        var L = [['A', 'n1'], ['A', 'n2'], ['n1', 'n3'], ['n2', 'n4'], ['n1', 'n4'], ['n3', 'B'], ['n4', 'B']], o = '';
        L.forEach(function (l) {
          var on = hot && hot.indexOf(l[0] + l[1]) >= 0;
          o += line(P[l[0]][0], P[l[0]][1] + dy, P[l[1]][0], P[l[1]][1] + dy, { c: on ? C.blue : C.grayM, w: on ? 6 : 2 });
        });
        ['n1', 'n2', 'n3', 'n4'].forEach(function (k) { o += circ(P[k][0], P[k][1] + dy, 11, { fill: '#fff', c: C.sub }); });
        o += dev(22, 56 + dy, 44, 32, 'A', C.ink, C.grayL) + dev(414, 56 + dy, 44, 32, 'B', C.ink, C.grayL);
        return o;
      }
      function pk(x, y, n) { return box(x - 11, y - 10, 22, 20, { fill: C.orangeL, c: C.orange, label: n, lc: C.orange, size: 13, r: 3 }); }
      var s = t(16, 18, '회선 교환', { b: 1, c: C.blue }) + t(100, 18, '— 전용 길을 잡아 둔다', { b: 1, c: C.blue, ans: true }) + net(0, ['An1', 'n1n3', 'n3B']);
      s += t(16, 144, '패킷 교환', { b: 1, c: C.orange }) + t(100, 144, '— 조각이 제각각 길로', { b: 1, c: C.orange, ans: true }) + net(126);
      s += pk(106, 184, '1') + pk(240, 228, '2') + pk(240, 197, '3');
      s += S(458, 244, '도착해서 다시 맞춤', { a: 'e', ans: true });
      return F.svg(480, 258, s);
    });

  add('jitter', ['네트워크 품질 지표와 측정 도구'],
    '패킷 도착 모양 — 고르게 오면 정상, 간격이 흔들리면 지터, 아예 안 오면 손실',
    function () {
      var rows = [['고른 도착', [130, 190, 250, 310, 370, 430], C.blue], ['지터', [130, 172, 262, 296, 392, 430], C.orange], ['손실', [130, 190, -250, 310, 370, 430], C.red]];
      var s = '';
      rows.forEach(function (r, k) {
        var y = 44 + k * 52;
        s += t(16, y, r[0], { b: 1, c: k ? r[2] : C.ink }) + line(110, y + 14, 462, y + 14, { c: C.grayM, w: 1.4 });
        r[1].forEach(function (x) {
          if (x < 0) { x = -x; s += box(x - 13, y - 10, 26, 20, { fill: '#fff', c: C.red, dash: '4 3', r: 3 }) + line(x - 8, y - 6, x + 8, y + 6, { c: C.red, w: 2 }) + line(x + 8, y - 6, x - 8, y + 6, { c: C.red, w: 2 }); }
          else s += box(x - 13, y - 10, 26, 20, { fill: k === 1 ? C.orangeL : C.blueL, c: k === 1 ? C.orange : C.blue, r: 3 });
        });
      });
      s += t(462, 188, '시간 →', { size: 13, c: C.sub, a: 'e' });
      s += S(240, 210, '기준 — 손실률 1% 이하 · 지터 30ms 이하(허용)', { c: C.ink });
      return F.svg(480, 228, s);
    });

  add('fwIds', ['네트워크 보안 장비 — 방화벽·IDS·IPS'],
    '방화벽은 들어오는 문에서 막고, IPS 는 길 한가운데서 찾으면 바로 끊고, IDS 는 옆에서 복사본을 보고 알린다',
    function () {
      var s = cloud(56, 84, 84, 58, { label: '바깥 망' });
      s += arrow(100, 84, 124, 84, { w: 1.8, head: 9 });
      /* 방화벽 — 벽돌 */
      s += box(126, 52, 44, 64, { fill: C.orangeL, c: C.orange, r: 2 });
      for (var k = 0; k < 4; k++) s += line(126, 52 + 16 * k, 170, 52 + 16 * k, { c: C.orange, w: 1 }) + line(k % 2 ? 140 : 156, 52 + 16 * k, k % 2 ? 140 : 156, 68 + 16 * k, { c: C.orange, w: 1 });
      s += T(148, 136, '방화벽', { b: 1, c: C.orange }) + S(148, 156, '막는다');
      s += arrow(170, 84, 200, 84, { w: 1.8, head: 9 });
      s += dev(202, 62, 64, 44, 'IPS', C.red, C.redL) + S(234, 128, '찾고 바로 끊음', { c: C.red, b: 1 });
      s += arrow(266, 84, 296, 84, { w: 1.8, head: 9 });
      s += dev(298, 62, 70, 44, '스위치', C.ink, C.grayL, { size: 14 });
      s += arrow(368, 84, 390, 84, { w: 1.8, head: 9 }) + dev(392, 58, 76, 52, '안쪽 망', C.ink, '#fff', { size: 14 });
      s += line(333, 106, 333, 176, { c: C.blue, w: 1.6, dash: '5 4' }) + S(340, 140, '복사본', { a: 's', c: C.blue });
      s += dev(298, 178, 70, 40, 'IDS', C.blue, C.blueL);
      s += arrow(368, 198, 404, 198, { c: C.blue, w: 1.6, head: 9 }) + t(408, 190, '알림', { size: 14, b: 1, c: C.blue }) + t(408, 210, '→ 관리자', { size: 13, c: C.sub });
      s += S(150, 200, 'IDS — 찾아서 알리기만(수동적)', { c: C.ink }) + S(150, 222, 'IPS — 그 자리에서 차단(능동적)', { c: C.ink });
      return F.svg(480, 240, s);
    });

  /* ═══════════ CH02 통신 네트워크 유지관리 ═══════════ */

  add('netParts', ['정보통신망의 구성요소'],
    '정보통신망의 네 구성요소 — ① 단말기 ② 전송 매체(선·무선) ③ 통신장비 ④ 제어장치',
    function () {
      var s = cloud(420, 44, 90, 52, { label: '인터넷', size: 14 });
      s += line(366, 44, 376, 44, { c: C.sub }) + line(318, 62, 318, 96, { c: C.sub });
      s += dev(270, 26, 96, 36, '방화벽', C.purple, C.purpleL, { size: 14 }) + dev(16, 26, 116, 36, '관리 서버', C.purple, C.purpleL, { size: 14 });
      s += dev(270, 96, 96, 36, '라우터', C.orange, C.orangeL, { size: 14 }) + dev(120, 96, 110, 36, '스위치', C.orange, C.orangeL, { size: 14 });
      s += line(74, 62, 150, 96, { c: C.sub }) + line(230, 114, 270, 114, { c: C.sub });
      var dv = [['HMI', 16], ['PLC', 126], ['센서', 236], ['액추에이터', 346]];
      s += line(150, 132, 66, 190, { c: C.sub }) + line(175, 132, 176, 190, { c: C.sub }) + line(200, 132, 286, 190, { c: C.sub, dash: '5 4' });
      s += line(226, 208, 346, 208, { c: C.sub });
      dv.forEach(function (d) { s += dev(d[1], 190, 100, 36, d[0], C.blue, C.blueL, { size: 14 }); });
      s += S(262, 160, '무선', { a: 's', b: 1 }) + S(126, 160, '유선', { a: 's', b: 1 });
      s += F.num(150, 44, '④', { c: C.purple }) + F.num(254, 82, '③', { c: C.orange }) + F.num(462, 208, '①', { c: C.blue }) + F.num(62, 150, '②', { c: C.sub });
      s += t(16, 250, '①', { size: 14, b: 1, c: C.blue }) + t(34, 250, '단말기', { size: 14 }) +
        t(110, 250, '②', { size: 14, b: 1, c: C.sub }) + t(128, 250, '전송 매체', { size: 14 }) +
        t(222, 250, '③', { size: 14, b: 1, c: C.orange }) + t(240, 250, '통신장비', { size: 14 }) +
        t(334, 250, '④', { size: 14, b: 1, c: C.purple }) + t(352, 250, '제어장치', { size: 14 });
      return F.svg(480, 268, s);
    });

  add('netScale', ['정보통신망의 종류 — LAN·MAN·WAN·PAN'],
    '잇는 범위로 나눈 통신망 — PAN(개인 주변) < LAN(건물) < MAN(도시) < WAN(국가·대륙)',
    function () {
      var cx = 168, cy = 134, s = '';
      s += ell(cx, cy, 158, 114, { fill: C.grayL, c: C.sub }) + ell(cx, cy, 118, 84, { fill: C.purpleL, c: C.purple }) +
        ell(cx, cy, 80, 56, { fill: C.blueL, c: C.blue }) + ell(cx, cy, 40, 28, { fill: '#fff', c: C.orange });
      s += T(cx, cy - 8, 'PAN', { b: 1, c: C.orange, halo: false }) + S(cx, cy + 12, '약 10m', { halo: false });
      s += T(cx, cy - 42, 'LAN · 건물', { b: 1, c: C.blue, size: 15, halo: false });
      s += T(cx, cy - 69, 'MAN · 도시', { b: 1, c: C.purple, size: 15, halo: false });
      s += T(cx, cy - 98, 'WAN · 국가·대륙', { b: 1, c: C.ink, size: 15, halo: false });
      var ux = 342, lines = [['스마트공장에서', C.sub, 1], ['WAN  본사–지사', C.ink], ['MAN  공장 간', C.purple], ['LAN  생산라인', C.blue], ['PAN  웨어러블 센서', C.orange]];
      lines.forEach(function (l, k) { s += t(ux, 60 + k * 34, l[0], { size: k ? 14 : 13, c: l[1], b: k ? 1 : 0 }); });
      return F.svg(480, 262, s);
    });

  add('mtbf', ['정보통신망의 네 가지 특성'],
    '안정성 지표 — MTBF(고장 사이 가동 시간)는 길수록, MTTR(수리 시간)은 짧을수록 좋다',
    function () {
      var seg = [[20, 170, 1], [170, 212, 0], [212, 362, 1], [362, 404, 0], [404, 460, 1]], s = '';
      seg.forEach(function (g) {
        s += box(g[0], 88, g[1] - g[0], 32, { fill: g[2] ? C.greenL : C.redL, c: g[2] ? C.green : C.red, r: 0, w: 1.4, label: g[2] ? '가동' : '수리', lc: g[2] ? C.green : C.red, size: 14 });
      });
      function brk(x1, x2, y, up) { var d = up ? 8 : -8; return poly([[x1, y + d], [x1, y], [x2, y], [x2, y + d]], { c: C.green, w: 1.6 }); }
      s += brk(22, 168, 78, 1) + brk(214, 360, 78, 1) + T(240, 56, 'MTBF — 고장과 고장 사이의 가동 시간', { b: 1, c: C.green, size: 15 });
      s += poly([[172, 122], [172, 132], [210, 132], [210, 122]], { c: C.red, w: 1.6 }) + poly([[364, 122], [364, 132], [402, 132], [402, 122]], { c: C.red, w: 1.6 });
      s += T(290, 154, 'MTTR — 평균 수리 시간', { b: 1, c: C.red, size: 15 });
      s += box(60, 180, 360, 42, { fill: '#fff', c: C.ink, r: 10 }) + T(240, 201, '가용성 = MTBF ÷ (MTBF + MTTR)', { b: 1, size: 18, halo: false });
      s += S(240, 240, '전체 시간 가운데 정상으로 돈 시간의 비율', { c: C.ink });
      return F.svg(480, 256, s);
    });

  add('rssi', ['점검 기준 항목 — 성능과 물리'],
    '무선 신호강도(dBm) — 음수이고 0에 가까울수록 강하다: −50 이상 우수 · −50~−70 양호 · −70~−85 보통 · −85 이하 불량',
    function () {
      function X(db) { return 30 + (db + 100) * 6; }
      var z = [[-100, -85, '불량', C.redL, C.red], [-85, -70, '보통', C.orangeL, C.orange], [-70, -50, '양호', C.greenL, C.green], [-50, -30, '우수', C.green, '#fff']], s = '';
      z.forEach(function (q) { s += box(X(q[0]), 66, X(q[1]) - X(q[0]), 42, { fill: q[3], c: q[4] === '#fff' ? C.green : q[4], r: 0, w: 1.2, label: q[2], lc: q[4], size: 16 }); });
      [-85, -70, -50].forEach(function (d) { s += line(X(d), 108, X(d), 118, { c: C.ink, w: 1.4 }) + T(X(d), 132, d + ' dBm', { size: 14, b: 1 }); });
      s += arrow(210, 34, 40, 34, { c: C.sub, w: 1.6, head: 9 }) + t(44, 20, '약하다', { size: 13, c: C.sub });
      s += arrow(270, 34, 440, 34, { c: C.sub, w: 1.6, head: 9 }) + t(436, 20, '강하다(0에 가까움)', { size: 13, c: C.sub, a: 'e' });
      s += S(240, 162, 'RSSI 로 잰다 · −50dBm 이 −85dBm 보다 강하다', { c: C.ink });
      return F.svg(480, 180, s);
    });

  /* ═══════════ CH03 데이터 수집장치 설치 ═══════════ */

  add('collect', ['데이터 수집장치의 구성과 데이터 종류'],
    '수집장치 — 제조 데이터(PLC·센서)와 제조 환경 데이터(센서)를 사람 손 대신 자동으로 모은다',
    function () {
      var s = t(16, 18, '제조 데이터', { b: 1, c: C.blue, size: 15 }) + t(16, 172, '제조 환경 데이터', { b: 1, c: C.green, size: 15 });
      s += dev(16, 32, 130, 36, 'PLC · 컴퓨터', C.blue, C.blueL, { size: 14 }) + S(81, 82, '자동화된 설비');
      s += dev(16, 98, 130, 36, '센서 덧붙임', C.blue, C.blueL, { size: 14 }) + S(81, 148, '자동화 안 된 설비');
      s += dev(16, 186, 130, 36, '환경 센서', C.green, C.greenL, { size: 14 }) + S(81, 236, '전압·전류·진동·온도');
      s += box(196, 92, 124, 62, { fill: C.orangeL, c: C.orange }) + T(258, 112, '수집', { b: 1, c: C.orange, halo: false }) + T(258, 134, '인터페이스', { b: 1, c: C.orange, halo: false });
      s += arrow(146, 50, 194, 104, { w: 1.6, head: 9, c: C.blue }) + arrow(146, 116, 194, 120, { w: 1.6, head: 9, c: C.blue }) + arrow(146, 204, 194, 140, { w: 1.6, head: 9, c: C.green });
      s += arrow(320, 123, 356, 123, { w: 1.8, head: 9 }) + dev(358, 99, 104, 48, '서버 · DB', C.ink, C.grayL, { size: 15 });
      s += S(258, 176, '자동으로 모은다', { b: 1, c: C.orange }) + S(258, 196, '(손으로 적으면 빠뜨림)');
      return F.svg(480, 254, s);
    });

  add('twin', ['디지털 트윈'],
    '디지털 트윈 — 현실 설비를 가상 공간에 쌍둥이로 만들고, 실시간 데이터로 이어 미리 시뮬레이션한다',
    function () {
      function mach(x, y, virt) {
        var c = virt ? C.blue : C.ink, f = virt ? 'none' : C.grayL, d = virt ? '5 4' : 0, o = '';
        o += box(x, y + 70, 150, 16, { fill: f, c: c, r: 8, dash: d });
        for (var i = 0; i < 5; i++) o += circ(x + 15 + i * 30, y + 78, 5, { fill: virt ? 'none' : '#fff', c: c, w: 1.2, dash: d });
        o += box(x + 88, y + 48, 30, 22, { fill: virt ? 'none' : C.orangeL, c: virt ? C.blue : C.orange, r: 3, dash: d });
        o += box(x + 14, y + 52, 26, 18, { fill: f, c: c, r: 3, dash: d });
        o += line(x + 27, y + 52, x + 45, y + 16, { c: c, w: 3, dash: d }) + line(x + 45, y + 16, x + 92, y + 22, { c: c, w: 3, dash: d }) + line(x + 92, y + 22, x + 100, y + 44, { c: c, w: 2, dash: d });
        o += circ(x + 45, y + 16, 5, { fill: '#fff', c: c, w: 1.4 });
        return o;
      }
      var s = mach(14, 40, false) + mach(316, 40, true);
      s += T(89, 154, '현실 설비', { b: 1 }) + T(391, 154, '가상 설비', { b: 1, c: C.blue }) + S(391, 174, '(디지털 트윈)', { c: C.blue });
      s += arrow(176, 72, 304, 72, { c: C.green, w: 2.2, flow: 1 }) + T(240, 56, '실시간 데이터', { size: 14, b: 1, c: C.green });
      s += arrow(304, 112, 176, 112, { c: C.orange, w: 2.2 }) + T(240, 130, '시뮬레이션 결과', { size: 14, b: 1, c: C.orange });
      s += S(240, 206, '설계 · 생산 · 유지보수를 가상에서 먼저 돌려 보고 결정한다', { c: C.ink });
      return F.svg(480, 224, s);
    });

  add('edge', ['스마트 센서와 에지 컴퓨팅', '꼭 알아 둘 용어 정리'],
    '에지 컴퓨팅 — 현장 가까이에서 먼저 처리하고, 필요한 것만 클라우드로 보낸다(지연↓ · 네트워크 부하↓)',
    function () {
      var s = T(62, 20, '현장', { b: 1, c: C.sub }) + T(226, 20, '에지', { b: 1, c: C.orange, ans: true }) + T(404, 20, '클라우드', { b: 1, c: C.sub });
      var ys = [48, 96, 144, 192], nm = ['센서', '센서', '센서', 'PLC'];
      ys.forEach(function (y, k) {
        s += dev(20, y - 16, 84, 32, nm[k], k === 3 ? C.ink : C.blue, k === 3 ? C.grayL : C.blueL, { size: 14 });
        if (k < 3) s += arrow(104, y, 168, 108 + (k - 1) * 10, { c: C.blue, w: 1.8, head: 8 });
      });
      s += box(170, 82, 112, 72, { fill: C.orangeL, c: C.orange }) + T(226, 108, '에지 서버', { b: 1, c: C.orange, halo: false, ans: true }) + S(226, 132, '먼저 처리', { c: C.orange, halo: false });
      s += route([[226, 154], [226, 192], [108, 192]], { c: C.green, w: 2, head: 9 }) + S(166, 208, '빠른 피드백', { c: C.green, b: 1 });
      s += cloud(404, 118, 104, 64, { label: '클라우드', size: 14 });
      s += arrow(282, 112, 346, 112, { c: C.sub, w: 1.4, head: 8 }) + S(314, 94, '필요한 것만', { b: 1 });
      s += S(404, 172, '저장 · 빅데이터 분석');
      return F.svg(480, 230, s);
    });
  function route(p, o) { return F.route(p, o); }

  add('adc', ['ADC 특성 — 해상도·샘플링 속도·정확도·정밀도'],
    'ADC — 아날로그 곡선을 일정 간격으로 떠서(샘플링) 정해진 계단(해상도) 가운데 가장 가까운 값으로 바꾼다',
    function () {
      var x0 = 42, y0 = 214, W = 256, st = 22, s = '';
      for (var L = 0; L <= 7; L++) s += line(x0, y0 - L * st, x0 + W, y0 - L * st, { c: C.edge, w: 1 });
      s += axes(x0, y0, W + 14, 7 * st + 22, '시간', '');
      s += t(x0 - 8, y0, '0', { size: 13, c: C.sub, a: 'e' }) + t(x0 - 8, y0 - 7 * st, '7', { size: 13, c: C.sub, a: 'e' });
      function v(u) { return 3.6 + 3.1 * Math.sin(2 * Math.PI * 0.95 * u + 0.25); }
      var cur = [];
      for (var i = 0; i <= 100; i++) cur.push([x0 + W * i / 100, y0 - v(i / 100) * st]);
      var n = 12, stp = [];
      for (i = 0; i < n; i++) {
        var u = i / n, q = Math.max(0, Math.min(7, Math.round(v(u)))), xa = x0 + W * u, xb = x0 + W * (i + 1) / n;
        stp.push([xa, y0 - q * st], [xb, y0 - q * st]);
      }
      s += poly(stp, { c: C.orange, w: 2.6 }) + poly(cur, { c: C.blue, w: 2 });
      for (i = 0; i < n; i++) { var uu = i / n; s += dot(x0 + W * uu, y0 - v(uu) * st, 3.5, C.ink); }
      s += t(x0 + 6, 20, '— 아날로그', { size: 13, c: C.blue, b: 1 }) + t(x0 + 104, 20, '— 디지털(계단)', { size: 13, c: C.orange, b: 1 }) + t(x0 + 220, 20, '● 샘플', { size: 13 });
      var ux = 318;
      s += t(ux, 58, '해상도', { b: 1, c: C.orange }) + t(ux, 80, '3비트 = 2³ = 8단계', { size: 14 }) + t(ux, 100, '12비트 = 4096단계', { size: 14, ans: true });
      s += t(ux, 122, '0~10V 면 한 칸이', { size: 13, c: C.sub }) + t(ux, 140, '10 ÷ 4096 ≈ 2.44mV', { size: 13, c: C.sub });
      s += t(ux, 172, '샘플링', { b: 1 }) + t(ux, 194, '신호 주파수의', { size: 14 }) + t(ux, 214, '2배 이상으로 뜬다', { size: 14 }) + t(ux, 232, '(나이퀴스트)', { size: 13, c: C.sub });
      return F.svg(480, 250, s);
    });

  add('bias', ['ADC 특성 — 해상도·샘플링 속도·정확도·정밀도', '측정 시스템 분석(MSA)과 데이터 변동'],
    '정확도는 참값(가운데)에 가까운가, 정밀도는 값끼리 모여 있는가 — 모여 있어도 치우치면 그 차이가 편의(bias)',
    function () {
      var cx = [62, 178, 294, 410], cy = 88, s = '';
      var sets = [
        [[0, 0], [5, -4], [-4, 5], [3, 6], [-5, -3]],
        [[22, -20], [27, -24], [18, -15], [25, -14], [20, -26]],
        [[-26, 8], [20, 20], [8, -28], [-14, -18], [24, -6]],
        [[30, 20], [-8, 34], [20, -30], [36, -4], [12, 30]]
      ];
      var lab = [['정확 ○', '정밀 ○'], ['정확 ✕', '정밀 ○'], ['정확 ○', '정밀 ✕'], ['정확 ✕', '정밀 ✕']];
      for (var i = 0; i < 4; i++) {
        s += circ(cx[i], cy, 50, { fill: '#fff', c: C.sub, w: 1.2 }) + circ(cx[i], cy, 33, { fill: 'none', c: C.sub, w: 1.2 }) + circ(cx[i], cy, 15, { fill: C.redL, c: C.red, w: 1.2 });
        sets[i].forEach(function (p) { s += dot(cx[i] + p[0], cy + p[1], 4.5, C.blue); });
        s += T(cx[i], 160, lab[i][0], { size: 15, b: 1, c: lab[i][0].indexOf('○') > 0 ? C.green : C.red }) +
          T(cx[i], 182, lab[i][1], { size: 15, b: 1, c: lab[i][1].indexOf('○') > 0 ? C.green : C.red });
      }
      s += arrow(178, 88, 196, 70, { c: C.orange, w: 2, head: 8 }) + T(178, 20, '편의(bias)', { size: 14, b: 1, c: C.orange });
      s += line(178, 28, 188, 72, { c: C.orange, w: 1 });
      s += S(240, 212, '가운데 빨간 원 = 참값(기준값) · 파란 점 = 여러 번 잰 값', { c: C.ink });
      return F.svg(480, 230, s);
    });

  add('cast', ['통신 네트워크의 기본과 구성 기기'],
    '보내는 방식 — 유니캐스트 1:1 · 멀티캐스트 1:정해진 여럿 · 브로드캐스트 1:네트워크 전체',
    function () {
      var s = '', tg = [[1], [0, 2, 3], [0, 1, 2, 3, 4]], ttl = [['유니캐스트', '1 : 1'], ['멀티캐스트', '1 : 정해진 여럿'], ['브로드캐스트', '1 : 전체']];
      for (var i = 0; i < 3; i++) {
        var x0 = 10 + i * 157, sx = x0 + 26, sy = 108;
        s += T(x0 + 72, 20, ttl[i][0], { b: 1, c: C.blue, size: 15 }) + S(x0 + 72, 40, ttl[i][1], { b: 1 });
        s += dev(sx - 20, sy - 16, 40, 32, '나', C.blue, C.blueL, { size: 14 });
        for (var k = 0; k < 5; k++) {
          var rx = x0 + 124, ry = 60 + k * 26, on = tg[i].indexOf(k) >= 0;
          if (on) s += arrow(sx + 20, sy, rx - 12, ry, { c: C.blue, w: 1.6, head: 8 });
          s += circ(rx, ry, 10, { fill: on ? C.blueL : '#fff', c: on ? C.blue : C.grayM, w: 1.6 });
        }
        if (i === 1) s += '';
        if (i < 2) s += line(x0 + 150, 20, x0 + 150, 190, { c: C.edge, w: 1.4 });
      }
      s += S(240, 206, '파란 동그라미 = 받는 쪽', { c: C.ink });
      return F.svg(480, 222, s);
    });

  /* ═══════════ CH04 로봇 인터페이스 시스템 ═══════════ */

  /* 수직 다관절 로봇 팔 — 바닥 가운데가 (0,0). F.g 로 옮기고 키운다 */
  function armShape(c, fill) {
    c = c || C.ink;
    var o = box(-26, -14, 52, 14, { fill: C.grayM, c: c, r: 3, w: 1.4 }) + box(-14, -32, 28, 18, { fill: fill || C.grayL, c: c, r: 4, w: 1.4 });
    o += line(0, -34, 24, -88, { c: c, w: 9 }) + line(24, -88, 76, -76, { c: c, w: 8 }) + line(76, -76, 90, -60, { c: c, w: 5 });
    o += line(84, -56, 81, -46, { c: c, w: 3 }) + line(95, -60, 97, -49, { c: c, w: 3 });
    [[0, -34], [24, -88], [76, -76]].forEach(function (p) { o += circ(p[0], p[1], 6, { fill: '#fff', c: c, w: 2 }); });
    return o;
  }
  function person(x, y, c) {
    c = c || C.ink;
    return circ(x, y - 40, 8, { fill: '#fff', c: c, w: 2 }) + line(x, y - 32, x, y - 12, { c: c, w: 3 }) +
      line(x, y - 12, x - 8, y, { c: c, w: 3 }) + line(x, y - 12, x + 8, y, { c: c, w: 3 }) + line(x - 10, y - 26, x + 10, y - 26, { c: c, w: 3 });
  }
  function fence(x, y, w, h) {
    var o = box(x, y, w, h, { fill: 'none', c: C.orange, r: 2, w: 2, dash: '8 5' });
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(function (p) { o += box(p[0] - 4, p[1] - 4, 8, 8, { fill: C.orange, c: C.orange, r: 1, w: 1 }); });
    return o;
  }

  add('robotSys', ['로봇 인터페이스 시스템의 구성'],
    '로봇 인터페이스 시스템의 기본 셋 — 로봇(매니퓰레이터 + 말단 장치) · 제어기 · 티칭 펜던트',
    function () {
      var s = F.g(armShape(C.blue, C.blueL), { x: 84, y: 214, s: 1.35 });
      s += callout(150, 104, 180, 44, '말단 장치', { a: 's' }) + callout(98, 128, 20, 60, '매니퓰레이터', { a: 's' });
      s += box(236, 104, 86, 110, { fill: C.grayL, c: C.ink, r: 6 }) + box(248, 118, 62, 26, { fill: '#fff', c: C.sub, r: 3, w: 1 }) +
        circ(262, 168, 5, { fill: C.green, c: C.green }) + circ(280, 168, 5, { fill: C.red, c: C.red });
      s += T(279, 232, '제어기', { b: 1 }) + S(279, 250, 'CPU·메모리·I/O·드라이버');
      s += box(386, 118, 58, 86, { fill: C.orangeL, c: C.orange, r: 10 }) + box(394, 128, 42, 32, { fill: '#fff', c: C.orange, r: 3, w: 1 }) +
        circ(403, 176, 4, { fill: C.orange, c: C.orange }) + circ(415, 176, 4, { fill: C.orange, c: C.orange }) + circ(427, 176, 4, { fill: C.red, c: C.red });
      s += T(415, 222, '티칭 펜던트', { b: 1, c: C.orange }) + S(415, 240, '동작 교시');
      s += path('M118,210 C160,232 206,232 236,200', { c: C.sub, w: 2 }) + path('M322,170 C350,170 360,184 386,176', { c: C.sub, w: 2 });
      s += dev(352, 26, 112, 38, '주변 설비 · PLC', C.ink, '#fff', { size: 14 }) + line(300, 104, 380, 64, { c: C.sub, w: 2 });
      return F.svg(480, 262, s);
    });

  add('cobot', ['산업용 로봇 · 협동 로봇 · 이동 로봇', '협동작업 가이드'],
    '제조용 로봇은 울타리로 사람과 공간을 나누고, 협동 로봇은 같은 공간에서 일한다(대신 따로 안전 기준)',
    function () {
      var s = T(118, 20, '제조용 로봇', { b: 1 }) + T(362, 20, '협동 로봇', { b: 1, c: C.green });
      s += fence(22, 40, 176, 150) + F.g(armShape(C.ink), { x: 90, y: 180 }) + person(222, 190, C.ink);
      s += S(110, 212, '울타리로 공간을 나눔', { c: C.orange, b: 1, ans: true }) + line(240, 16, 240, 222, { c: C.edge, w: 1.4 });
      s += ell(362, 150, 104, 50, { fill: C.greenL, c: C.green, dash: '6 4' }) + F.g(armShape(C.ink), { x: 314, y: 180 }) + person(420, 190, C.ink);
      s += S(362, 212, '같은 공간 — 힘·거리 감시', { c: C.green, b: 1, ans: true });
      return F.svg(480, 230, s);
    });

  add('arm', ['로봇 팔의 구성 — 액추에이터·감속기·동력전달'],
    '로봇 팔 = 링크(뼈대) + 관절. 관절은 회전 관절과 직선 관절이 있고, 모터 → 감속기로 속도를 줄여 힘(토크)을 키운다',
    function () {
      var s = F.g(armShape(C.blue, C.blueL), { x: 88, y: 226, s: 1.5 });
      s += callout(88, 175, 16, 130, '관절', { a: 's' }) + callout(112, 128, 60, 64, '링크(뼈대)', { a: 's' }) + callout(222, 138, 186, 40, '말단 장치', { a: 's' });
      s += T(372, 22, '관절 두 가지', { b: 1, size: 15 });
      s += circ(318, 70, 16, { fill: C.blueL, c: C.blue }) + line(318, 70, 318, 34, { c: C.blue, w: 5 }) + path('M296,88 A28,28 0 0 1 296,52', { c: C.orange, w: 2 }) +
        F.poly([[296, 52], [290, 62], [302, 60]], { close: 1, fill: C.orange, c: C.orange, w: 1 });
      s += S(318, 108, '회전 관절', { c: C.ink, b: 1 });
      s += box(390, 50, 70, 26, { fill: C.grayL, c: C.ink, r: 4 }) + line(404, 63, 470, 63, { c: C.blue, w: 6 }) + arrow(420, 90, 462, 90, { c: C.orange, w: 2, head: 8, both: 1 });
      s += S(424, 108, '직선 관절', { c: C.ink, b: 1 });
      s += box(290, 138, 60, 32, { fill: C.grayL, c: C.ink, label: '모터', size: 14 }) + arrow(350, 154, 370, 154, { w: 1.6, head: 8 }) +
        box(372, 138, 72, 32, { fill: C.orangeL, c: C.orange, label: '감속기', lc: C.orange, size: 14 });
      s += S(366, 190, '속도 ↓  토크 ↑', { b: 1, c: C.orange, ans: true }) + S(366, 214, '어느 자세든 → 보통 6축(6자유도)', { c: C.ink });
      return F.svg(480, 244, s);
    });

  add('encoder', ['로봇 센서 — 내부 센서와 외부 센서'],
    '엔코더 — 원판의 슬릿을 빛이 지날 때마다 펄스가 하나씩 나온다. 펄스를 세면 각도, 빠르기를 보면 속도',
    function () {
      var cx = 104, cy = 118, s = circ(cx, cy, 78, { fill: C.grayL, c: C.ink, w: 2 }) + circ(cx, cy, 12, { fill: '#fff', c: C.ink, w: 2 });
      for (var k = 0; k < 24; k++) {
        var a = k * Math.PI / 12, a2 = a + Math.PI / 30;
        s += F.poly([[cx + 58 * Math.cos(a), cy + 58 * Math.sin(a)], [cx + 72 * Math.cos(a), cy + 72 * Math.sin(a)], [cx + 72 * Math.cos(a2), cy + 72 * Math.sin(a2)], [cx + 58 * Math.cos(a2), cy + 58 * Math.sin(a2)]], { close: 1, fill: '#fff', c: C.sub, w: 0.8 });
      }
      s += path('M' + (cx + 40) + ',' + (cy + 96) + ' A100,100 0 0 0 ' + (cx + 96) + ',' + (cy + 40), { c: C.orange, w: 2 }) + T(cx + 96, cy + 92, '회전', { size: 14, b: 1, c: C.orange });
      s += box(cx - 12, 14, 24, 18, { fill: C.orangeL, c: C.orange, r: 3 }) + S(cx - 20, 22, '빛', { a: 'e', b: 1, c: C.orange });
      s += line(cx, 32, cx, 52, { c: C.orange, w: 2, dash: '3 3' });
      s += arrow(196, 118, 232, 118, { w: 1.8, head: 9 });
      var p = [], x = 246;
      for (k = 0; k < 7; k++) { p.push([x, 150], [x, 96], [x + 14, 96], [x + 14, 150], [x + 30, 150]); x += 30; }
      s += poly(p, { c: C.blue, w: 2.4 }) + T(350, 76, '펄스', { b: 1, c: C.blue });
      s += S(350, 180, '펄스 수 → 돌아간 각도', { c: C.ink, b: 1 }) + S(350, 202, '펄스 빠르기 → 속도', { c: C.ink, b: 1 }) + S(350, 226, '디지털이라 잡음에 강하다');
      return F.svg(480, 244, s);
    });

  add('frames', ['로봇의 좌표계'],
    '월드 좌표계는 로봇 베이스에 고정(변하지 않음), 툴 좌표계는 말단 장치의 TCP 가 원점, 사용자 좌표계는 작업 대상에 맞춰 정한다',
    function () {
      function ax(x, y, ang, len, c, lx, lz) {
        var r = ang * Math.PI / 180, o = '';
        o += arrow(x, y, x + len * Math.cos(r), y + len * Math.sin(r), { c: c, w: 2.2, head: 9 }) + t(x + (len + 12) * Math.cos(r), y + (len + 12) * Math.sin(r), lx, { size: 14, b: 1, c: c, a: 'm' });
        o += arrow(x, y, x + len * Math.cos(r - Math.PI / 2), y + len * Math.sin(r - Math.PI / 2), { c: c, w: 2.2, head: 9 }) + t(x + (len + 12) * Math.cos(r - Math.PI / 2), y + (len + 12) * Math.sin(r - Math.PI / 2), lz, { size: 14, b: 1, c: c, a: 'm' });
        return o + dot(x, y, 4, c);
      }
      var s = F.g(armShape(C.sub), { x: 96, y: 206, s: 1.4 });
      s += ax(60, 224, 0, 44, C.blue, 'X', 'Z') + t(16, 250, '월드 좌표계 — 베이스에 고정', { size: 14, b: 1, c: C.blue });
      s += ax(223, 154, 45, 34, C.orange, 'X', 'Z') + t(254, 196, 'TCP', { size: 14, b: 1, c: C.orange }) + t(270, 128, '툴 좌표계', { size: 14, b: 1, c: C.orange, a: 's' });
      s += F.g(box(-80, -9, 160, 18, { fill: C.grayL, c: C.ink, r: 9 }) + ax(-40, -9, 0, 34, C.green, 'X', 'Z'), { x: 380, y: 196, r: -14 });
      s += t(380, 240, '사용자 좌표계', { size: 14, b: 1, c: C.green, a: 'm' }) + S(380, 258, '비스듬한 컨베이어에 맞춤', { ans: true });
      return F.svg(480, 272, s);
    });

  add('robotTypes', ['로봇의 형태 — 직교·원통·극·다관절·스카라'],
    '로봇의 형태 다섯 가지 — 축을 어떻게 짜느냐에 따라 작업 영역(점선) 모양이 다르다',
    function () {
      var c = C.blue, s = '';
      function lab(cx, y, a, b) { return T(cx, y, a, { b: 1, size: 15 }) + S(cx, y + 20, b); }
      function cell(i, x0, y0) {
        var cx = x0 + 80, by = y0 + 116, o = '';
        if (i === 0) {
          o += box(cx - 46, by - 42, 92, 36, { fill: C.blueL, c: C.blue, dash: '5 4', r: 2, w: 1.4 });
          o += line(cx - 52, by, cx - 52, by - 84, { c: C.ink, w: 4 }) + line(cx + 52, by, cx + 52, by - 84, { c: C.ink, w: 4 }) + line(cx - 58, by - 84, cx + 58, by - 84, { c: C.ink, w: 5 });
          o += box(cx - 10, by - 92, 20, 16, { fill: C.grayL, c: C.ink, r: 2 }) + line(cx, by - 76, cx, by - 46, { c: C.ink, w: 4 });
          o += lab(cx, y0 + 136, '직교좌표형', '직선 3축 · 영역 직육면체');
        } else if (i === 1) {
          o += ell(cx, by - 92, 56, 10, { c: C.blue, dash: '5 4' }) + ell(cx, by - 14, 56, 10, { c: C.blue, dash: '5 4', fill: C.blueL }) +
            line(cx - 56, by - 92, cx - 56, by - 14, { c: C.blue, w: 1.4, dash: '5 4' }) + line(cx + 56, by - 92, cx + 56, by - 14, { c: C.blue, w: 1.4, dash: '5 4' });
          o += box(cx - 14, by - 8, 28, 10, { fill: C.grayM, c: C.ink, r: 2 }) + line(cx, by - 8, cx, by - 96, { c: C.ink, w: 6 }) + line(cx, by - 60, cx + 46, by - 60, { c: C.ink, w: 5 });
          o += lab(cx, y0 + 136, '원통좌표형', '직선 2 + 회전 1');
        } else if (i === 2) {
          o += path('M' + (cx - 58) + ',' + (by - 40) + ' A64,64 0 0 1 ' + (cx + 60) + ',' + (by - 60), { c: C.blue, w: 1.4, dash: '5 4', fill: 'none' });
          o += box(cx - 16, by - 12, 32, 12, { fill: C.grayM, c: C.ink, r: 2 }) + line(cx, by - 12, cx, by - 40, { c: C.ink, w: 6 }) + circ(cx, by - 40, 6, { fill: '#fff', c: C.ink, w: 2 });
          o += line(cx, by - 40, cx + 36, by - 74, { c: C.ink, w: 7 }) + line(cx + 36, by - 74, cx + 54, by - 90, { c: C.ink, w: 3.5 });
          o += lab(cx, y0 + 136, '극좌표형', '직선 1 + 회전 2');
        } else if (i === 3) {
          o += path('M' + (cx - 66) + ',' + (by - 6) + ' A84,84 0 0 1 ' + (cx + 84) + ',' + (by - 30), { c: C.blue, w: 1.4, dash: '5 4', fill: 'none' });
          o += F.g(armShape(C.ink), { x: cx - 26, y: by, s: 0.85 });
          o += lab(cx, y0 + 136, '수직 다관절형', '회전 6축');
        } else {
          o += ell(cx - 20, by - 62, 70, 14, { c: C.blue, dash: '5 4', fill: C.blueL });
          o += box(cx - 36, by - 8, 32, 10, { fill: C.grayM, c: C.ink, r: 2 }) + line(cx - 20, by - 8, cx - 20, by - 72, { c: C.ink, w: 6 }) +
            line(cx - 20, by - 72, cx + 14, by - 72, { c: C.ink, w: 7 }) + line(cx + 14, by - 68, cx + 46, by - 68, { c: C.ink, w: 6 }) + line(cx + 46, by - 68, cx + 46, by - 34, { c: C.ink, w: 3 });
          o += circ(cx - 20, by - 72, 5, { fill: '#fff', c: C.ink, w: 2 }) + circ(cx + 14, by - 70, 5, { fill: '#fff', c: C.ink, w: 2 });
          o += lab(cx, y0 + 136, '스카라(수평 다관절)', '수평 회전 3 + 수직 직선 1');
        }
        return o;
      }
      s += cell(0, 0, 0) + cell(1, 160, 0) + cell(2, 320, 0) + cell(3, 80, 170) + cell(4, 240, 170);
      return F.svg(480, 340, s);
    });

  add('motion', ['동작 명령어와 안전장치'],
    '같은 두 점 사이 — PTP 는 각 축이 제각각 가장 빠르게(길 예측 어려움), 직선은 곧은 길, 원호는 경유점을 지나는 둥근 길',
    function () {
      var P1 = [70, 150], P2 = [410, 150], s = '';
      s += path('M70,150 C150,236 330,236 410,150', { c: C.orange, w: 2.6, dash: '8 5' });
      s += line(70, 150, 410, 150, { c: C.blue, w: 2.8 });
      s += path('M70,150 A170,120 0 0 1 410,150', { c: C.green, w: 2.6 });
      s += circ(240, 30, 6, { fill: C.green, c: C.green }) + t(250, 26, '경유점', { size: 13, c: C.green, a: 's' });
      s += circ(P1[0], P1[1], 7, { fill: '#fff', c: C.ink, w: 2.4 }) + circ(P2[0], P2[1], 7, { fill: '#fff', c: C.ink, w: 2.4 });
      s += T(56, 176, '시작', { size: 14, b: 1 }) + T(424, 176, '끝', { size: 14, b: 1 });
      s += t(254, 140, '직선(Linear)', { size: 15, b: 1, c: C.blue, a: 'm' }) + t(240, 72, '원호(Circular)', { size: 15, b: 1, c: C.green, a: 'm' }) +
        t(240, 190, 'PTP — 빠르지만 길이 제각각', { size: 15, b: 1, c: C.orange, a: 'm' });
      s += S(240, 238, '장애물이 있는 구간에는 PTP 를 쓰지 않는다', { c: C.ink });
      return F.svg(480, 254, s);
    });

  /* ═══════════ CH05 감시 제어 시스템(SCADA) ═══════════ */

  add('scada', ['SCADA — 감시 제어 시스템', 'SCADA의 구성요소', 'SCADA와 HMI'],
    'SCADA 의 구성 — 현장(센서·PLC·RTU) → 통신망 → 서버 → HMI(운영자), 위로는 MES·ERP 와 이어진다',
    function () {
      var s = '';
      s += dev(16, 22, 124, 42, 'HMI', C.blue, C.blueL) + S(78, 78, '운영자가 보고 조작');
      s += dev(180, 22, 110, 42, 'SCADA 서버', C.purple, C.purpleL, { size: 14 }) + S(235, 78, '처리 · 저장 · 알람');
      s += dev(330, 22, 110, 42, 'MES · ERP', C.ink, '#fff', { size: 14 }) + S(385, 78, '상위 시스템');
      s += arrow(142, 43, 178, 43, { w: 1.6, head: 8, both: 1 }) + arrow(292, 43, 328, 43, { w: 1.6, head: 8, both: 1 });
      s += line(235, 64, 235, 100, { c: C.sub, w: 2 });
      s += box(16, 100, 424, 28, { fill: C.grayL, c: C.sub, r: 14, label: '통신망 — 이더넷 · 시리얼 · 무선', size: 14, lc: C.ink });
      s += line(90, 128, 90, 156, { c: C.sub, w: 2 }) + line(290, 128, 290, 156, { c: C.sub, w: 2 });
      s += dev(30, 156, 120, 40, 'PLC', C.orange, C.orangeL) + dev(230, 156, 120, 40, 'RTU', C.orange, C.orangeL) + S(290, 212, '멀리 있는 설비의 원격 단말기');
      s += line(60, 196, 50, 226, { c: C.sub, w: 1.6 }) + line(120, 196, 130, 226, { c: C.sub, w: 1.6 });
      s += dev(14, 226, 72, 30, '센서', C.ink, '#fff', { size: 14 }) + dev(96, 226, 72, 30, '모터', C.ink, '#fff', { size: 14 });
      return F.svg(480, 270, s);
    });

  add('serialNet', ['통신 방식과 프로토콜', '데이터 통신과 프로토콜'],
    'RS-232C 는 1:1(약 15m), RS-422 는 1:N(최대 10대), RS-485 는 N:N(최대 32대) — 422·485 는 차동 신호로 약 1.2km',
    function () {
      function nd(x, y, l, c) { return dev(x - 24, y - 15, 48, 30, l, c || C.ink, c === C.blue ? C.blueL : '#fff', { size: 13 }); }
      var s = '';
      s += t(16, 36, 'RS-232C', { b: 1 }) + S(16, 56, '1 : 1 · 약 15m', { a: 's' }) + nd(200, 44, 'PC', C.blue) + line(224, 44, 336, 44, { c: C.ink, w: 2 }) + nd(360, 44, '기기');
      s += t(16, 110, 'RS-422', { b: 1 }) + S(16, 130, '1 : N · 최대 10대', { a: 's' }) + nd(200, 120, '마스터', C.blue);
      s += line(224, 120, 256, 120, { c: C.ink, w: 2 }) + line(256, 86, 256, 154, { c: C.ink, w: 2 });
      [86, 120, 154].forEach(function (y, k) { s += line(256, y, 300, y, { c: C.ink, w: 2 }) + nd(324, y, k === 2 ? '…' : '기기'); });
      s += t(16, 196, 'RS-485', { b: 1 }) + S(16, 216, 'N : N · 최대 32대', { a: 's' });
      s += line(170, 226, 460, 226, { c: C.ink, w: 3 });
      [196, 262, 328, 394].forEach(function (x, k) { s += line(x, 210, x, 226, { c: C.ink, w: 2 }) + nd(x, 196, k === 3 ? '…' : '기기', k === 0 ? C.blue : null); });
      s += S(315, 248, '한 줄(버스)에 여럿 · 반이중(보내기와 받기를 번갈아)');
      return F.svg(480, 262, s);
    });

  add('zone', ['SCADA 보안'],
    '망 분리 — 인터넷과 이어진 사무용망과 설비를 제어하는 SCADA 전용망 사이에 방화벽을 두고, 원격 접속은 VPN 으로만',
    function () {
      var s = box(12, 30, 170, 170, { fill: C.grayL, c: C.sub, r: 12 }) + T(97, 50, '사무용망(업무망)', { b: 1, size: 15, halo: false });
      s += dev(30, 70, 60, 34, 'PC', C.ink, '#fff', { size: 14 }) + dev(104, 70, 60, 34, 'PC', C.ink, '#fff', { size: 14 }) + dev(56, 124, 84, 34, '메일·웹', C.ink, '#fff', { size: 13 });
      s += cloud(97, 232, 90, 44, { label: '인터넷', size: 13 });
      s += box(214, 30, 36, 170, { fill: C.orangeL, c: C.orange, r: 2 });
      for (var k = 1; k < 10; k++) s += line(214, 30 + k * 17, 250, 30 + k * 17, { c: C.orange, w: 1 });
      s += T(232, 214, '방화벽', { b: 1, c: C.orange });
      s += box(282, 30, 186, 170, { fill: C.blueL, c: C.blue, r: 12 }) + T(375, 50, 'SCADA 전용망', { b: 1, size: 15, c: C.blue, halo: false });
      s += dev(300, 70, 70, 34, '서버', C.blue, '#fff', { size: 14 }) + dev(384, 70, 70, 34, 'HMI', C.blue, '#fff', { size: 14 }) + dev(342, 124, 70, 34, 'PLC', C.blue, '#fff', { size: 14 });
      s += arrow(182, 100, 212, 100, { c: C.red, w: 2, head: 9 }) + line(196, 90, 206, 110, { c: C.red, w: 2 }) + line(206, 90, 196, 110, { c: C.red, w: 2 });
      s += path('M140,240 C220,272 340,266 375,200', { c: C.green, w: 5, op: 0.35 }) + path('M140,240 C220,272 340,266 375,200', { c: C.green, w: 1.6 });
      s += t(310, 282, 'VPN — 안전한 원격 접속', { size: 13, b: 1, c: C.green, a: 'm' });
      return F.svg(480, 296, s);
    });

  add('ipPlan', ['통신 설정과 계정 권한 설정', '설치와 통신 설정'],
    '장치마다 고유 IP — 스위치(허브)에 이더넷으로 잇고, 서버·HMI·PLC 같은 주요 장치는 고정 IP 로 둔다(주소는 예시)',
    function () {
      var s = dev(180, 116, 120, 44, '스위치', C.orange, C.orangeL);
      var d = [['서버', '192.168.1.10', 30, 42], ['HMI', '192.168.1.20', 330, 42], ['PLC', '192.168.1.30', 30, 196], ['RTU', '192.168.1.40', 330, 196]];
      d.forEach(function (q) {
        var top = q[3] < 100;
        s += line(q[2] + 60, q[3] + (top ? 40 : 0), 240, top ? 116 : 160, { c: C.sub, w: 2 });
        s += dev(q[2], q[3], 120, 40, q[0], C.blue, C.blueL) + T(q[2] + 60, top ? q[3] - 16 : q[3] + 58, q[1], { b: 1, size: 14 });
      });
      s += S(240, 280, '포트 번호도 약속대로 (예: Modbus TCP 502)', { c: C.ink });
      return F.svg(480, 296, s);
    });

  /* ═══════════ CH06 데이터 인터페이스 설치 ═══════════ */

  function dbCyl(x, y, w, h, label, c, fill) {
    c = c || C.ink; fill = fill || C.grayL;
    var ry = 8, o = '';
    o += path('M' + x + ',' + (y + ry) + ' V' + (y + h - ry) + ' A' + (w / 2) + ',' + ry + ' 0 0 0 ' + (x + w) + ',' + (y + h - ry) + ' V' + (y + ry), { fill: fill, c: c, w: 1.6 });
    o += ell(x + w / 2, y + ry, w / 2, ry, { fill: fill, c: c });
    return o + (label ? T(x + w / 2, y + h / 2 + 6, label, { size: 14, b: 1, c: c, halo: false }) : '');
  }

  add('ifChain', ['데이터 인터페이스 시스템이란'],
    '데이터 인터페이스의 순서 — 수집 → 변환(표준 형식 + 태그) → 전송 → 저장·활용 (태그 이름은 예시)',
    function () {
      var st = [['수집', '센서 · PLC', '재는 사람'], ['변환', '표준 형식', '+ 태그'], ['전송', 'OPC UA · MQTT', '실어 나르는 길'], ['저장·활용', 'MES · DB', '창고']], s = '';
      for (var i = 0; i < 4; i++) {
        var x = 8 + i * 118;
        s += box(x, 22, 104, 74, { fill: i === 1 ? C.orangeL : C.blueL, c: i === 1 ? C.orange : C.blue }) + F.num(x + 14, 22, String(i + 1), { c: i === 1 ? C.orange : C.blue });
        s += T(x + 52, 42, st[i][0], { b: 1, halo: false }) + S(x + 52, 64, st[i][1], { c: C.ink, halo: false }) + S(x + 52, 82, st[i][2], { halo: false });
        if (i < 3) s += arrow(x + 105, 59, x + 117, 59, { w: 1.6, head: 7 });
      }
      s += box(24, 138, 60, 46, { fill: '#fff', c: C.sub, r: 6 }) + T(54, 162, '78', { b: 1, size: 20, halo: false }) + S(54, 200, '값만 있음');
      s += arrow(90, 161, 138, 161, { c: C.orange, w: 2, head: 9 });
      s += box(142, 124, 180, 76, { fill: C.orangeL, c: C.orange, r: 8 });
      s += t(154, 142, '태그  라인1_온도', { size: 14, b: 1, c: C.orange, halo: false }) + t(154, 164, '값  78 ℃', { size: 14, halo: false }) + t(154, 186, '시각 · 장비 ID · 품질', { size: 13, c: C.sub, halo: false });
      s += S(232, 216, '메타데이터를 붙인다', { b: 1, c: C.orange });
      s += arrow(326, 161, 380, 161, { w: 2, head: 9 }) + dbCyl(386, 132, 76, 60, 'DB');
      return F.svg(480, 230, s);
    });

  add('rdbTsdb', ['데이터 인터페이스의 요구 사항'],
    'RDB 는 행과 열의 표로 관계를 다루고, TSDB 는 센서 값을 시간 순서대로 쌓아 빠르게 꺼내 본다 (값은 예시)',
    function () {
      var s = T(118, 20, '관계형 DB (RDB)', { b: 1, size: 15 }) + T(356, 20, '시계열 DB (TSDB)', { b: 1, size: 15, c: C.blue });
      var hd = ['품번', '품명', '수량'], rows = [['A01', '브래킷', '120'], ['A02', '샤프트', '80'], ['A03', '커버', '45']];
      for (var c = 0; c < 3; c++) {
        s += box(22 + c * 64, 38, 64, 28, { fill: C.grayM, c: C.sub, r: 0, w: 1, label: hd[c], size: 14 });
        for (var r = 0; r < 3; r++) s += box(22 + c * 64, 66 + r * 28, 64, 28, { fill: '#fff', c: C.sub, r: 0, w: 1, label: rows[r][c], size: 14, b: 0 });
      }
      s += S(118, 186, '행 × 열 표 · SQL 로 관계를 묻는다', { c: C.ink });
      s += axes(262, 150, 200, 112, '시간', '');
      var pts = [], v = [70, 76, 72, 84, 90, 86, 96, 92, 104, 100];
      for (var i = 0; i < v.length; i++) { pts.push([276 + i * 18, 150 - v[i] + 40]); }
      s += poly(pts, { c: C.blue, w: 2 });
      pts.forEach(function (p) { s += dot(p[0], p[1], 3.5, C.blue); });
      s += S(356, 186, '센서 값이 시간 순서대로 쌓인다', { c: C.ink });
      s += S(240, 214, 'MES 와 이으려면 실시간 처리가 되는 TSDB 가 필요', { b: 1, c: C.blue });
      return F.svg(480, 232, s);
    });

  add('opcua', ['OPC UA — 이기종 장비를 잇는 국제 표준'],
    'OPC UA — 제조사가 다른 장비들이 하나의 규격으로 데이터를 내고, 상위 시스템은 그 하나만 알면 된다',
    function () {
      var s = '', L = [['A사 PLC', 40], ['B사 PLC', 100], ['C사 로봇', 160]], Rr = [['MES', 40], ['SCADA', 100], ['클라우드', 160]];
      L.forEach(function (q, k) {
        s += dev(14, q[1] - 18, 104, 36, q[0], C.ink, [C.grayL, C.yellowL, C.greenL][k], { size: 14 }) + arrow(118, q[1], 176, 100 + (k - 1) * 18, { c: C.sub, w: 1.6, head: 8 });
      });
      s += box(180, 58, 120, 84, { fill: C.blueL, c: C.blue, r: 14 }) + T(240, 90, 'OPC UA', { b: 1, size: 18, c: C.blue, halo: false }) + S(240, 116, '하나의 규격', { c: C.blue, halo: false });
      Rr.forEach(function (q, k) { s += arrow(302, 100 + (k - 1) * 18, 360, q[1], { c: C.blue, w: 1.6, head: 8 }) + dev(362, q[1] - 18, 104, 36, q[0], C.blue, '#fff', { size: 14 }); });
      s += S(66, 200, '말이 제각각', { b: 1 }) + S(240, 200, '실시간 값 · 알람 · 이력', { b: 1, c: C.blue }) + S(414, 200, '하나만 알면 됨', { b: 1 });
      return F.svg(480, 218, s);
    });

  add('opcTier', ['OPC UA 기반 연계 구조와 요구 사항', '꼭 알아 둘 용어 정리'],
    'OPC UA 연계 3단 — ① 현장 장비가 원시 데이터를 올리고 ② OPC UA 서버가 표준 형식·태그로 바꾸고 ③ 상위 시스템이 구독해 받는다',
    function () {
      var s = '';
      var col = [[16, '① 현장 장비', C.ink, C.grayL], [176, '② OPC UA 서버', C.orange, C.orangeL], [336, '③ 상위 시스템', C.blue, C.blueL]];
      col.forEach(function (q) { s += box(q[0], 20, 130, 190, { fill: q[3], c: q[2], r: 12 }) + T(q[0] + 65, 40, q[1], { b: 1, size: 15, c: q[2], halo: false }); });
      ['PLC', '센서', '액추에이터'].forEach(function (n, k) { s += dev(32, 58 + k * 42, 98, 32, n, C.ink, '#fff', { size: 14 }); });
      s += S(81, 192, '온도·압력·진동 원시값', { c: C.ink, halo: false });
      s += dev(192, 64, 98, 32, '에지 서버', C.orange, '#fff', { size: 13 }) + S(241, 110, '(있기도 함)', { halo: false });
      s += S(241, 138, '정규화', { c: C.ink, b: 1, halo: false }) + S(241, 158, 'XML · Binary', { c: C.ink, halo: false }) + S(241, 178, '메타데이터 · 태그', { c: C.ink, halo: false });
      ['MES · ERP', 'SCADA', '클라우드 · DB'].forEach(function (n, k) { s += dev(352, 58 + k * 42, 98, 32, n, C.blue, '#fff', { size: 13 }); });
      s += S(401, 192, '클라이언트로 구독', { c: C.ink, halo: false });
      s += arrow(146, 115, 174, 115, { w: 2, head: 9 }) + arrow(306, 115, 334, 115, { w: 2, head: 9 });
      s += S(240, 228, '이더넷 · RS-485 · 무선(Wi-Fi, LoRa) 무엇으로 들어와도 받는다', { c: C.ink });
      return F.svg(480, 246, s);
    });

  add('flow5', ['단계적 데이터 흐름'],
    '데이터 흐름 다섯 단계 — ① 래더 작성 ② PLC → OPC ③ 태그 생성 ④ DB 저장 ⑤ MES 연계',
    function () {
      var nd = [['PC', 12], ['PLC', 108], ['OPC 서버', 204], ['DB', 300], ['MES', 396]], s = '';
      nd.forEach(function (q, k) {
        if (q[0] === 'DB') s += dbCyl(q[1] + 8, 60, 56, 52, 'DB', C.ink, C.grayL);
        else s += dev(q[1], 66, 72, 42, q[0], k === 2 ? C.orange : C.ink, k === 2 ? C.orangeL : C.grayL, { size: 14, ans: k === 2 });
      });
      var lab = ['래더 작성', '데이터 전달', '', 'DB 저장', 'MES 연계'];
      [[84, 106], [180, 202], [276, 302], [372, 394]].forEach(function (a, k) {
        var n = [1, 2, 4, 5][k];
        s += arrow(a[0], 87, a[1], 87, { c: C.blue, w: 2, head: 8 }) + F.num((a[0] + a[1]) / 2, 50, String(n), { c: C.blue, r: 11 }) + S((a[0] + a[1]) / 2, 24, lab[n - 1], { c: C.ink, b: 1 });
      });
      s += F.num(240, 128, '3', { c: C.orange, r: 11 }) + S(240, 152, '태그 생성', { c: C.orange, b: 1 });
      s += path('M262,108 C300,196 420,196 432,110', { c: C.blue, w: 1.6, dash: '5 4' }) + S(360, 196, '⑤ OPC 클라이언트로', { c: C.blue });
      return F.svg(480, 214, s);
    });

  /* ═══════════ CH07 스마트공장 시스템 안전관리 ═══════════ */

  add('law', ['「산업안전보건법」의 개념과 체계'],
    '법령의 층 — 위로 갈수록 상위 법. 산업안전보건법은 국회가, 시행령은 대통령이, 시행규칙·고시는 고용노동부가 만든다',
    function () {
      var cx = 160, s = '', lv = ['헌법', '산업안전보건법', '시행령', '시행규칙', '고시·예규·훈령'],
        who = ['국회', '국회', '대통령', '고용노동부', '고용노동부'], pen = ['헌법재판소', '형사처벌', '과태료 등', '과태료 등', '과태료 등'];
      function hw(y) { return 24 + (y - 34) * 0.62; }
      s += t(326, 20, '만드는 곳', { size: 13, c: C.sub }) + t(406, 20, '어기면', { size: 13, c: C.sub });
      for (var i = 0; i < 5; i++) {
        var y1 = 34 + i * 42, y2 = y1 + 42, key = i === 1;
        s += poly([[cx - hw(y1), y1], [cx + hw(y1), y1], [cx + hw(y2), y2], [cx - hw(y2), y2]], { close: 1, fill: key ? C.orangeL : C.blueL, c: key ? C.orange : C.blue, w: 1.6 });
        s += T(cx, (y1 + y2) / 2 + (i === 0 ? 8 : 0), lv[i], { b: 1, size: i === 1 ? 14 : 15, c: key ? C.orange : C.blue, halo: false });
        s += t(326, (y1 + y2) / 2, who[i], { size: 14, b: 1 }) + t(406, (y1 + y2) / 2, pen[i], { size: 13, c: key ? C.red : C.ink, b: key ? 1 : 0 });
      }
      return F.svg(480, 256, s);
    });

  add('rates', ['안전관리 지표 — 계산 문제가 나옵니다'],
    '재해 지표 세 가지 — 무엇을 세서(분자) 무엇으로 나누고(분모) 얼마를 곱하나',
    function () {
      var rw = [['도수율', C.blue, '재해 건수', '연 근로 총시간', '× 1,000,000'], ['강도율', C.green, '근로 손실 일수', '연 근로 총시간', '× 1,000'], ['천인율', C.orange, '연간 재해 건수', '연평균 근로자 수', '× 1,000']], s = '';
      rw.forEach(function (r, k) {
        var y = 48 + k * 70;
        s += box(12, y - 26, 456, 56, { fill: '#fff', c: C.edge, r: 10 });
        s += t(26, y, r[0], { b: 1, size: 18, c: r[1] }) + t(122, y, '=', { size: 18, b: 1 });
        s += T(232, y - 13, r[2], { size: 15, b: 1 }) + line(148, y, 316, y, { c: C.ink, w: 1.8 }) + T(232, y + 13, r[3], { size: 15 });
        s += t(330, y, r[4], { size: 17, b: 1, c: C.red, ans: true });
      });
      return F.svg(480, 240, s);
    });

  add('riskMatrix', ['위험성 평가'],
    '위험성 = 가능성(빈도) × 중대성(피해 크기) — 둘 다 클수록 먼저 줄인다 (3단계 눈금은 예시)',
    function () {
      var x0 = 96, y0 = 184, cw = 64, ch = 46, s = '';
      for (var a = 1; a <= 3; a++) for (var b = 1; b <= 3; b++) {
        var p = a * b, fl = p <= 2 ? C.greenL : (p <= 4 ? C.orangeL : C.redL), lc = p <= 2 ? C.green : (p <= 4 ? C.orange : C.red);
        s += box(x0 + (b - 1) * cw, y0 - a * ch, cw, ch, { fill: fl, c: '#fff', r: 0, w: 2, label: String(p), lc: lc, size: 17 });
      }
      for (var k = 1; k <= 3; k++) { s += T(x0 - 12, y0 - k * ch + ch / 2, String(k), { size: 14, c: C.sub }) + T(x0 + (k - 1) * cw + cw / 2, y0 + 14, String(k), { size: 14, c: C.sub }); }
      s += t(16, 30, '가능성(빈도) ↑', { size: 14, b: 1 }) + T(x0 + 96, y0 + 36, '중대성(피해 크기) →', { size: 14, b: 1 });
      var lx = 316;
      s += t(lx, 44, '위험성 크기', { b: 1 }) + t(lx, 66, '= 가능성 × 중대성', { size: 14 });
      s += box(lx, 92, 18, 18, { fill: C.greenL, c: C.green, r: 3 }) + t(lx + 26, 101, '낮음 — 허용 범위', { size: 14 });
      s += box(lx, 120, 18, 18, { fill: C.orangeL, c: C.orange, r: 3 }) + t(lx + 26, 129, '중간 — 줄인다', { size: 14 });
      s += box(lx, 148, 18, 18, { fill: C.redL, c: C.red, r: 3 }) + t(lx + 26, 157, '높음 — 먼저 줄인다', { size: 14 });
      var step = ['사전 준비', '요인 파악', '추정', '결정', '감소 대책'];
      step.forEach(function (n, i) {
        var x = 12 + i * 93;
        s += box(x, 240, 84, 34, { fill: C.grayL, c: C.sub, r: 8, label: n, size: 13, lc: C.ink }) + F.num(x + 10, 240, String(i + 1), { c: C.blue, r: 10, size: 12 });
        if (i < 4) s += arrow(x + 85, 257, x + 92, 257, { w: 1.4, head: 6 });
      });
      return F.svg(480, 288, s);
    });

  add('failSafe', ['페일 세이프와 풀 프루프'],
    '페일 세이프는 기계가 고장 나도(물적), 풀 프루프는 사람이 실수해도(인적) 사고로 이어지지 않게 한다',
    function () {
      var s = T(120, 22, '페일 세이프 — 고장 나도', { b: 1, size: 15, c: C.blue }) + T(362, 22, '풀 프루프 — 실수해도', { b: 1, size: 15, c: C.green });
      var fs = [['Fail Passive', '즉시 정지'], ['Fail Active', '경보 + 잠깐 운전'], ['Fail Operational', '다음 보수까지 운전']];
      fs.forEach(function (q, k) {
        var y = 42 + k * 56;
        s += box(14, y, 212, 46, { fill: C.blueL, c: C.blue, r: 8 }) + t(26, y + 15, q[0], { size: 14, b: 1, c: C.blue, halo: false }) + t(26, y + 34, q[1], { size: 14, halo: false });
      });
      s += S(120, 224, '예 — 엔진 하나가 멈춰도 가는 비행기', { c: C.ink }) + line(240, 14, 240, 236, { c: C.edge, w: 1.4 });
      /* 탈수기 — 뚜껑을 열면 멈춤 */
      s += box(300, 88, 116, 110, { fill: C.grayL, c: C.ink, r: 8 }) + circ(358, 146, 34, { fill: '#fff', c: C.ink, w: 2 }) + circ(358, 146, 22, { fill: C.greenL, c: C.green, w: 1.4 });
      s += F.g(box(0, -6, 92, 10, { fill: C.grayM, c: C.ink, r: 3 }), { x: 302, y: 86, r: -24 });
      s += box(334, 132, 48, 28, { fill: C.red, c: C.red, r: 4, label: '정지', lc: '#fff', size: 14 });
      s += S(362, 216, '탈수기 뚜껑을 열면 즉시 멈춤', { c: C.ink });
      return F.svg(480, 244, s);
    });

  add('levels', ['스마트공장 발전 5단계'],
    '스마트공장 수준 5단계 — 식별·점검에서 맞춤·자율까지, 단계마다 핵심 기술이 다르다',
    function () {
      var d = [['Lv 1', ['식별·점검'], 'RFID·바코드'], ['Lv 2', ['측정·', '모니터링'], '센서'], ['Lv 3', ['실시간', '수집·분석'], '분석 도구'], ['Lv 4', ['제어·', '최적화'], 'AI·빅데이터'], ['Lv 5', ['맞춤·자율'], 'AR/VR·CPS']], s = '';
      var col = [C.grayL, C.grayL, C.blueL, C.blueL, C.orangeL], lc = [C.sub, C.sub, C.blue, C.blue, C.orange];
      for (var i = 0; i < 5; i++) {
        var x = 8 + i * 94, top = 170 - i * 30;
        s += box(x, top, 88, 236 - top, { fill: col[i], c: lc[i], r: 6 });
        s += T(x + 44, top + 16, d[i][0], { b: 1, size: 15, c: lc[i] === C.sub ? C.ink : lc[i], halo: false });
        d[i][1].forEach(function (ln, k) { s += T(x + 44, top + 38 + k * 18, ln, { size: 14, halo: false }); });
        s += S(x + 44, top + 40 + d[i][1].length * 18, d[i][2], { b: 1, c: lc[i] === C.sub ? C.sub : lc[i], halo: false });
      }
      function brk(x1, x2, lab, c) { return poly([[x1, 244], [x1, 250], [x2, 250], [x2, 244]], { c: c, w: 1.4 }) + T((x1 + x2) / 2, 264, lab, { size: 14, b: 1, c: c }); }
      s += brk(10, 190, '기초', C.sub) + brk(198, 378, '중간', C.blue) + brk(386, 470, '고도화', C.orange);
      return F.svg(480, 276, s);
    });

  add('robotCell', ['로봇 작업 시 안전 조치', '산업용 로봇 안전 기술지침 — 용어와 구조', '로봇의 설치·사용·검사·교육'],
    '로봇 작업 구역(위에서 본 모습) — 울로 막고, 출입문에는 인터록, 조작반은 가동범위 밖, 비상정지는 손 닿는 곳에',
    function () {
      var s = fence(30, 34, 290, 196);
      s += circ(172, 128, 86, { fill: C.redL, c: C.red, w: 1.6, dash: '6 4' }) + t(172, 58, '가동범위', { size: 14, b: 1, c: C.red, a: 'm' });
      s += circ(172, 128, 18, { fill: C.grayM, c: C.ink, w: 2 }) + line(172, 128, 226, 102, { c: C.ink, w: 9 }) + circ(172, 128, 5, { fill: '#fff', c: C.ink, w: 1.5 });
      s += line(226, 102, 240, 92, { c: C.ink, w: 3 }) + line(226, 102, 238, 110, { c: C.ink, w: 3 });
      s += box(250, 226, 56, 8, { fill: '#fff', c: '#fff', r: 0, w: 0 }) + line(250, 230, 272, 206, { c: C.orange, w: 3 }) + path('M250,230 A30,30 0 0 1 280,230', { c: C.orange, w: 1, dash: '3 3' });
      s += box(302, 222, 14, 16, { fill: C.orange, c: C.orange, r: 2 });
      s += callout(309, 230, 360, 262, '출입문 인터록', { a: 's', ans: true });
      s += F.hatch(240, 190, 60, 26, { gap: 7, c: C.green }) + box(240, 190, 60, 26, { fill: 'none', c: C.green, r: 2, w: 1.4 });
      s += callout(240, 203, 200, 262, '안전 매트', { a: 'e' });
      s += callout(30, 180, 16, 262, '울(방책)', { a: 's', ans: true });
      s += box(354, 90, 96, 70, { fill: C.grayL, c: C.ink, r: 6 }) + T(402, 110, '조작반', { b: 1, halo: false }) + circ(402, 138, 12, { fill: C.red, c: C.red });
      s += t(402, 176, '비상정지(빨강)', { size: 13, b: 1, c: C.red, a: 'm' }) + t(402, 196, '가동범위 밖에서', { size: 13, c: C.sub, a: 'm' }) + t(402, 212, '로봇이 보이는 곳', { size: 13, c: C.sub, a: 'm' });
      s += person(402, 72, C.ink);
      return F.svg(480, 280, s);
    });

  /* ═══════════ CH08 PLC 제어 특수모듈 ═══════════ */

  function sumPt(x, y, signs) {   /* 가합점 — signs: {l:'+', b:'−', t:'+'} */
    var o = circ(x, y, 12, { fill: '#fff', c: C.ink, w: 1.8 }) + line(x - 8, y - 8, x + 8, y + 8, { c: C.ink, w: 1.2 }) + line(x - 8, y + 8, x + 8, y - 8, { c: C.ink, w: 1.2 });
    if (signs.l) o += t(x - 20, y - 12, signs.l, { size: 15, b: 1, a: 'm' });
    if (signs.b) o += t(x + 16, y + 20, signs.b, { size: 17, b: 1, a: 'm', c: C.red });
    if (signs.t) o += t(x + 16, y - 18, signs.t, { size: 15, b: 1, a: 'm' });
    return o;
  }

  add('loop', ['자동제어의 정의와 구성요소'],
    '폐회로 자동제어의 구성 — 목푯값과 되먹임 값을 비교부에서 빼서 오차를 내고, 제어기가 그 오차를 줄인다',
    function () {
      var y = 86, s = t(12, y - 22, '목푯값', { size: 14, b: 1 }) + arrow(14, y, 70, y, { w: 1.8, head: 9 });
      s += sumPt(84, y, { l: '+', b: '−' }) + S(84, y - 30, '비교부', { b: 1 });
      s += arrow(96, y, 128, y, { w: 1.8, head: 9 }) + S(114, y - 14, '오차');
      s += dev(130, y - 20, 84, 40, '제어기', C.blue, C.blueL, { size: 15 }) + S(172, y + 34, 'PID · PLC');
      s += arrow(214, y, 234, y, { w: 1.8, head: 8 }) + dev(236, y - 20, 84, 40, '구동기', C.blue, C.blueL, { size: 15 }) + S(278, y + 34, '모터 · 밸브');
      s += arrow(320, y, 340, y, { w: 1.8, head: 8 }) + dev(342, y - 20, 86, 40, '제어대상', C.ink, C.grayL, { size: 15 }) + S(385, y + 34, '보일러 · 로봇 팔');
      s += arrow(428, y, 470, y, { w: 1.8, head: 9 }) + t(470, y - 16, '제어량', { size: 14, b: 1, a: 'e' });
      s += arrow(385, 22, 385, 64, { c: C.red, w: 1.8, head: 9 }) + t(395, 24, '외란', { size: 14, b: 1, c: C.red });
      s += line(450, y, 450, 188, { c: C.green, w: 2 }) + arrow(450, 188, 322, 188, { c: C.green, w: 2, head: 9 });
      s += dev(220, 168, 100, 40, '검출기(센서)', C.green, C.greenL, { size: 14 });
      s += line(220, 188, 84, 188, { c: C.green, w: 2 }) + arrow(84, 188, 84, 100, { c: C.green, w: 2, head: 9 }) + S(150, 208, '되먹임(피드백)', { b: 1, c: C.green });
      return F.svg(480, 226, s);
    });

  add('openClosed', ['개회로 · 폐회로 · 반폐회로'],
    '개회로는 결과를 되돌려 보지 않고, 폐회로는 최종 출력을 재어 되먹이고, 반폐회로는 모터 축의 회전각만 재어 되먹인다',
    function () {
      var s = '';
      function row(y, name, col, sub) {
        return t(12, y - 26, name, { b: 1, size: 15, c: col }) + t(96, y - 26, sub, { size: 13, c: C.sub, ans: true }) +
          arrow(12, y, 52, y, { w: 1.6, head: 8 }) + dev(54, y - 16, 88, 32, '제어기', col, '#fff', { size: 14 });
      }
      /* 개회로 */
      s += row(56, '개회로', C.sub, '결과를 되돌려 보지 않음') + arrow(142, 56, 174, 56, { w: 1.6, head: 8 }) + dev(176, 40, 96, 32, '제어대상', C.ink, C.grayL, { size: 14 }) +
        arrow(272, 56, 318, 56, { w: 1.6, head: 8 }) + t(324, 56, '출력', { size: 14 }) + S(410, 56, '예) 세탁기 타이머', { a: 'm' });
      /* 폐회로 */
      s += row(140, '폐회로', C.blue, '최종 출력을 재어 되먹임') + arrow(142, 140, 174, 140, { w: 1.6, head: 8 }) + dev(176, 124, 96, 32, '제어대상', C.ink, C.grayL, { size: 14 }) +
        arrow(272, 140, 318, 140, { w: 1.6, head: 8 }) + t(324, 140, '출력', { size: 14 });
      s += line(300, 140, 300, 176, { c: C.blue, w: 1.8 }) + dev(184, 164, 80, 26, '센서', C.blue, C.blueL, { size: 13 }) + line(184, 177, 98, 177, { c: C.blue, w: 1.8 }) + arrow(98, 177, 98, 158, { c: C.blue, w: 1.8, head: 8 });
      s += line(300, 176, 264, 176, { c: C.blue, w: 1.8 }) + S(410, 140, '예) 에어컨 온도', { a: 'm' });
      /* 반폐회로 */
      s += row(250, '반폐회로', C.green, '모터 축의 회전각을 재어 되먹임') + arrow(142, 250, 168, 250, { w: 1.6, head: 8 });
      s += dev(170, 234, 60, 32, '모터', C.ink, C.grayL, { size: 14 });
      s += line(230, 250, 450, 250, { c: C.ink, w: 3 });
      for (var k = 0; k < 22; k++) s += line(236 + k * 10, 244, 242 + k * 10, 256, { c: C.sub, w: 1 });
      s += box(330, 224, 80, 18, { fill: C.orangeL, c: C.orange, r: 3, label: '테이블', size: 13, lc: C.orange });
      s += circ(200, 272, 7, { fill: C.greenL, c: C.green, w: 1.6 }) + route([[200, 279], [200, 290], [98, 290], [98, 268]], { c: C.green, w: 1.8, head: 8, dash: '5 4' }) + t(210, 294, '엔코더', { size: 13, b: 1, c: C.green });
      s += S(390, 282, '테이블 위치는 직접 재지 않음', { c: C.ink });
      return F.svg(480, 306, s);
    });

  add('onoff', ['제어의 여러 분류'],
    'On-Off(2위치) 제어 — 목푯값보다 낮으면 켜고 높으면 끈다. 단순하지만 목푯값 근처에서 오르내린다',
    function () {
      var x0 = 50, y0 = 176, s = axes(x0, y0, 410, 160, '시간', '온도');
      s += line(x0, 96, x0 + 400, 96, { c: C.blue, w: 1.6, dash: '8 5' }) + t(x0 + 404, 90, '목푯값', { size: 14, b: 1, c: C.blue, a: 'e' });
      var p = [[x0, 170]], x = x0, yv = 170, on = true, seg = [], segStart = x0;
      var pts = [[50, 170], [120, 84], [165, 108], [205, 84], [250, 108], [290, 84], [335, 108], [375, 84], [420, 108], [455, 90]];
      s += poly(pts, { c: C.red, w: 2.4 });
      var bars = [[50, 120, 1], [120, 165, 0], [165, 205, 1], [205, 250, 0], [250, 290, 1], [290, 335, 0], [335, 375, 1], [375, 420, 0], [420, 455, 1]];
      bars.forEach(function (b) { s += box(b[0], 198, b[1] - b[0], 20, { fill: b[2] ? C.greenL : '#fff', c: b[2] ? C.green : C.grayM, r: 0, w: 1, label: b[2] ? 'ON' : 'OFF', size: 12, lc: b[2] ? C.green : C.sub }); });
      s += t(12, 208, '히터', { size: 13, b: 1 });
      s += callout(290, 84, 250, 40, '목푯값 근처에서 오르내림', { a: 's', size: 14 });
      return F.svg(480, 234, s);
    });

  add('stepResp', ['전달함수와 라플라스 변환'],
    '계단 입력(점선)을 넣었을 때 요소마다 출력 모양 — 비례는 그대로, 적분은 계속 늘고, 미분은 순간만, 1차 지연은 천천히 따라간다',
    function () {
      var s = '', cells = [['비례', 'G(s) = K'], ['적분', 'G(s) = K / s'], ['미분', 'G(s) = Ks'], ['1차 지연', 'G(s) = K / (Ts + 1)']];
      cells.forEach(function (q, i) {
        var x0 = 16 + (i % 2) * 236, y0 = 24 + Math.floor(i / 2) * 124, ox = x0 + 10, oy = y0 + 96;
        s += t(x0, y0, q[0], { b: 1, size: 15, c: C.blue }) + t(x0 + 212, y0, q[1], { size: 13, c: C.sub, a: 'e' });
        s += axes(ox, oy, 204, 76, '', '');
        s += poly([[ox, oy], [ox + 30, oy], [ox + 30, oy - 40], [ox + 196, oy - 40]], { c: C.grayM, w: 2, dash: '5 4' });
        var c = C.blue, p;
        if (i === 0) p = [[ox, oy], [ox + 30, oy], [ox + 30, oy - 58], [ox + 196, oy - 58]];
        else if (i === 1) p = [[ox, oy], [ox + 30, oy], [ox + 196, oy - 66]];
        else if (i === 2) { p = [[ox, oy], [ox + 30, oy], [ox + 30, oy - 66], [ox + 34, oy - 30], [ox + 44, oy - 6], [ox + 60, oy], [ox + 196, oy]]; }
        else {
          p = [[ox, oy], [ox + 30, oy]];
          for (var k = 0; k <= 40; k++) { var u = k / 40; p.push([ox + 30 + 166 * u, oy - 58 * (1 - Math.exp(-4.2 * u))]); }
          s += line(ox + 70, oy, ox + 70, oy - 58 * (1 - Math.exp(-4.2 * 40 / 166)), { c: C.sub, w: 1, dash: '3 3' }) + t(ox + 70, oy + 12, 'T', { size: 13, b: 1, c: C.sub, a: 'm' });
        }
        s += poly(p, { c: c, w: 2.4 });
      });
      return F.svg(480, 270, s);
    });

  add('blockEq', ['블록선도와 등가변환'],
    '블록선도 등가변환 — 직렬은 곱, 병렬은 합, (음의) 되먹임은 G / (1 + GH)',
    function () {
      var s = '', eqx = 318;
      function blk(x, y, lab, w) { return dev(x, y - 15, w || 50, 30, lab, C.blue, C.blueL, { size: 14 }); }
      function eq(y, lab) { return T(300, y, '⇒', { size: 20, b: 1, c: C.sub }) + dev(eqx, y - 18, 150, 36, lab, C.orange, C.orangeL, { size: 15 }); }
      /* 직렬 */
      s += t(12, 20, '직렬', { b: 1, size: 14, c: C.sub }) + t(12, 46, 'X', { b: 1 }) + arrow(26, 46, 60, 46, { w: 1.6, head: 8 }) + blk(62, 46, 'G₁') + arrow(112, 46, 144, 46, { w: 1.6, head: 8 }) + blk(146, 46, 'G₂') + arrow(196, 46, 246, 46, { w: 1.6, head: 8 }) + t(252, 46, 'Y', { b: 1 });
      s += eq(46, 'G₁ · G₂');
      /* 병렬 */
      var y = 132;
      s += t(12, 86, '병렬', { b: 1, size: 14, c: C.sub }) + t(12, y, 'X', { b: 1 }) + line(26, y, 50, y, { c: C.ink, w: 1.6 }) + dot(50, y, 4);
      s += route([[50, y], [50, y - 24], [88, y - 24]], { w: 1.6, head: 8 }) + blk(90, y - 24, 'G₁') + route([[140, y - 24], [190, y - 24], [190, y - 14]], { w: 1.6, head: 8 });
      s += route([[50, y], [50, y + 24], [88, y + 24]], { w: 1.6, head: 8 }) + blk(90, y + 24, 'G₂') + route([[140, y + 24], [190, y + 24], [190, y + 14]], { w: 1.6, head: 8 });
      s += sumPt(190, y, { t: '+' }) + t(206, y + 22, '+', { size: 15, b: 1, a: 'm' }) + arrow(202, y, 246, y, { w: 1.6, head: 8 }) + t(252, y, 'Y', { b: 1 });
      s += eq(y, 'G₁ + G₂');
      /* 되먹임 */
      y = 232;
      s += t(12, 188, '되먹임', { b: 1, size: 14, c: C.sub }) + t(12, y, 'X', { b: 1 }) + arrow(26, y, 58, y, { w: 1.6, head: 8 }) + sumPt(70, y, { l: '+', b: '−' });
      s += arrow(82, y, 110, y, { w: 1.6, head: 8 }) + blk(112, y, 'G') + arrow(162, y, 246, y, { w: 1.6, head: 8 }) + t(252, y, 'Y', { b: 1 }) + dot(212, y, 4);
      s += route([[212, y], [212, y + 36], [164, y + 36]], { w: 1.6, head: 8, c: C.green }) + dev(112, y + 22, 50, 28, 'H', C.green, C.greenL, { size: 14 });
      s += route([[112, y + 36], [70, y + 36], [70, y + 14]], { w: 1.6, head: 8, c: C.green });
      s += eq(y, 'G / (1 + G·H)');
      return F.svg(480, 292, s);
    });

  add('plcParts', ['PLC의 정의와 특징'],
    'PLC 의 구성 — 입력부가 스위치·센서 신호를 받고, CPU 가 메모리의 프로그램대로 판단해, 출력부가 모터·램프를 움직인다',
    function () {
      var s = box(70, 64, 340, 104, { fill: C.grayL, c: C.ink, r: 8 });
      var sl = [['전원부', C.sub, '#fff'], ['CPU', C.purple, C.purpleL], ['입력부', C.blue, C.blueL], ['출력부', C.orange, C.orangeL], ['통신부', C.sub, '#fff']];
      sl.forEach(function (q, k) { s += box(80 + k * 66, 74, 60, 84, { fill: q[2], c: q[1], r: 4 }) + T(110 + k * 66, 116, q[0], { size: 14, b: 1, c: q[1], halo: false }); });
      s += S(176, 146, '메모리', { c: C.purple, halo: false });
      s += dev(96, 200, 86, 32, '누름버튼', C.blue, '#fff', { size: 13 }) + dev(196, 200, 70, 32, '센서', C.blue, '#fff', { size: 13 });
      s += route([[139, 200], [139, 184], [212, 184], [212, 160]], { c: C.blue, w: 1.8, head: 8 }) + line(231, 200, 231, 184, { c: C.blue, w: 1.8 });
      s += dev(290, 200, 66, 32, '모터', C.orange, '#fff', { size: 13 }) + dev(366, 200, 66, 32, '램프', C.orange, '#fff', { size: 13 });
      s += route([[278, 160], [278, 184], [323, 184], [323, 198]], { c: C.orange, w: 1.8, head: 8 }) + route([[323, 184], [399, 184], [399, 198]], { c: C.orange, w: 1.8, head: 8 });
      s += dev(340, 10, 126, 32, 'HMI · SCADA', C.ink, '#fff', { size: 13 }) + route([[344, 72], [344, 56], [403, 56], [403, 44]], { c: C.sub, w: 1.6, head: 8, both: 1 });
      s += S(80, 248, '입력', { b: 1, c: C.blue, a: 's' }) + S(466, 248, '출력', { b: 1, c: C.orange, a: 'e' });
      return F.svg(480, 262, s);
    });

  add('relayPlc', ['릴레이 제어 vs PLC 제어, 그리고 PLC의 구성', 'HMI에 붙는 기계장비'],
    '릴레이 제어는 배선을 바꿔야 동작이 바뀌고, PLC 는 프로그램만 고치면 바뀐다',
    function () {
      var s = T(118, 20, '릴레이 제어반', { b: 1 }) + T(362, 20, 'PLC 제어', { b: 1, c: C.blue });
      s += box(16, 34, 204, 150, { fill: C.grayL, c: C.ink, r: 6 });
      var rp = [[40, 52], [100, 52], [160, 52], [40, 128], [100, 128], [160, 128]];
      rp.forEach(function (p) { s += box(p[0], p[1], 40, 32, { fill: '#fff', c: C.ink, r: 3, w: 1.2 }) + circ(p[0] + 20, p[1] + 16, 6, { fill: 'none', c: C.sub, w: 1 }); });
      var wires = [[[60, 84], [120, 128]], [[80, 84], [180, 128]], [[120, 84], [60, 128]], [[180, 84], [100, 128]], [[140, 84], [200, 128]], [[40, 100], [200, 110]], [[60, 84], [180, 128]]];
      wires.forEach(function (w, k) { s += path('M' + w[0][0] + ',' + w[0][1] + ' C' + (w[0][0] + 30) + ',' + (w[0][1] + 30) + ' ' + (w[1][0] - 30) + ',' + (w[1][1] - 30) + ' ' + w[1][0] + ',' + w[1][1], { c: [C.red, C.blue, C.ink, C.orange][k % 4], w: 1.6 }); });
      s += S(118, 206, '배선을 바꿔야 동작이 바뀐다', { c: C.ink, b: 1 }) + S(118, 226, '접점이 닳아 수명이 짧다');
      s += line(240, 14, 240, 232, { c: C.edge, w: 1.4 });
      s += box(262, 70, 104, 76, { fill: C.blueL, c: C.blue, r: 6, label: 'PLC', lc: C.blue });
      s += box(392, 72, 72, 48, { fill: '#fff', c: C.ink, r: 4 }) + poly([[384, 126], [472, 126], [466, 136], [390, 136]], { close: 1, fill: C.grayM, c: C.ink, w: 1.2 });
      for (var k = 0; k < 3; k++) s += line(400, 84 + k * 11, 440 - k * 8, 84 + k * 11, { c: C.blue, w: 2 });
      s += arrow(390, 98, 368, 98, { c: C.blue, w: 1.8, head: 8 });
      s += t(362, 206, '프로그램', { size: 13, b: 1, c: C.blue, a: 'e', ans: true }) + t(364, 206, '만 고치면 바뀐다', { size: 13, b: 1, c: C.ink, a: 's' }) + S(362, 226, '무접점 — 고속 · 수명이 길다');
      return F.svg(480, 244, s);
    });

  /* 래더 기호 */
  function cA(x, y, c) { c = c || C.ink; return line(x - 22, y, x - 8, y, { c: c, w: 2 }) + line(x - 8, y - 12, x - 8, y + 12, { c: c, w: 2.4 }) + line(x + 8, y - 12, x + 8, y + 12, { c: c, w: 2.4 }) + line(x + 8, y, x + 22, y, { c: c, w: 2 }); }
  function cB(x, y, c) { return cA(x, y, c) + line(x - 12, y + 12, x + 12, y - 12, { c: c || C.ink, w: 2 }); }
  function coil(x, y, c) {
    c = c || C.ink;
    return line(x - 22, y, x - 10, y, { c: c, w: 2 }) + path('M' + (x - 5) + ',' + (y - 12) + ' A14,14 0 0 0 ' + (x - 5) + ',' + (y + 12), { c: c, w: 2.4 }) +
      path('M' + (x + 5) + ',' + (y - 12) + ' A14,14 0 0 1 ' + (x + 5) + ',' + (y + 12), { c: c, w: 2.4 }) + line(x + 10, y, x + 22, y, { c: c, w: 2 });
  }

  add('plcLang', ['PLC 언어 네 가지'],
    '같은 동작(X0 과 X1 이 둘 다 ON 이면 Y0 ON)을 네 가지 PLC 언어로',
    function () {
      var s = '', mono = "Consolas,'D2Coding',monospace";
      function cell(x, y, w, h, ttl, desc) { return box(x, y, w, h, { fill: '#fff', c: C.edge, r: 8 }) + t(x + 10, y + 16, ttl, { size: 14, b: 1, c: C.blue }) + t(x + 18 + ttl.length * 9, y + 16, '— ' + desc, { size: 14, b: 1, c: C.blue, ans: true }); }
      function code(x, y, s2) { return '<text x="' + x + '" y="' + y + '" font-size="15" font-family="' + mono + '" fill="' + C.ink + '">' + s2 + '</text>'; }
      s += cell(8, 8, 228, 118, 'LD', '래더') + t(110, 24, '가장 많이 씀', { size: 12, c: C.sub, a: 's' });
      s += line(22, 42, 22, 112, { c: C.ink, w: 3 }) + line(222, 42, 222, 112, { c: C.ink, w: 3 });
      s += line(22, 78, 44, 78, { c: C.ink, w: 2 }) + cA(66, 78) + line(88, 78, 102, 78, { c: C.ink, w: 2 }) + cA(124, 78) + line(146, 78, 164, 78, { c: C.ink, w: 2 }) + coil(186, 78) + line(208, 78, 222, 78, { c: C.ink, w: 2 });
      s += T(66, 58, 'X0', { size: 13, b: 1 }) + T(124, 58, 'X1', { size: 13, b: 1 }) + T(186, 58, 'Y0', { size: 13, b: 1, c: C.orange });
      s += cell(244, 8, 228, 118, 'IL', '명령어 리스트') + code(260, 56, 'LOAD X0') + code(260, 80, 'AND  X1') + code(260, 104, 'OUT  Y0');
      s += cell(8, 134, 228, 118, 'ST', '구조적 텍스트') + code(22, 190, 'Y0 := X0 AND X1;');
      s += cell(244, 134, 228, 118, 'SFC', '순차 기능도');
      s += dev(300, 156, 44, 26, '1', C.ink, C.grayL, { size: 13 }) + line(322, 182, 322, 214, { c: C.ink, w: 2 }) + line(308, 198, 336, 198, { c: C.ink, w: 3 }) + t(344, 198, 'X0 · X1', { size: 13, c: C.sub });
      s += dev(300, 214, 44, 26, '2', C.ink, C.grayL, { size: 13 }) + line(344, 227, 366, 227, { c: C.ink, w: 1.4 }) + dev(366, 214, 60, 26, 'Y0', C.orange, C.orangeL, { size: 13 });
      s += t(360, 170, '스텝', { size: 12, c: C.sub }) + t(410, 198, '전이', { size: 12, c: C.sub });
      return F.svg(480, 260, s);
    });

  add('ladderRule', ['프로그래밍 시 유의 사항과 작성 순서'],
    '래더 작성 규칙 — 신호는 왼쪽 → 오른쪽, 위 → 아래로 흐르고, 출력 코일은 줄의 오른쪽 끝에 둔다',
    function () {
      var s = line(40, 40, 40, 156, { c: C.ink, w: 3 }) + line(440, 40, 440, 156, { c: C.ink, w: 3 });
      function rung(y, parts) {
        var o = '', x = 40;
        parts.forEach(function (p) { o += line(x, y, p[1] - 22, y, { c: C.ink, w: 2 }) + (p[0] === 'A' ? cA(p[1], y) : p[0] === 'B' ? cB(p[1], y) : coil(p[1], y)) + T(p[1], y - 22, p[2], { size: 13, b: 1, c: p[0] === 'C' ? C.orange : C.ink }); x = p[1] + 22; });
        return o + line(x, y, 440, y, { c: C.ink, w: 2 });
      }
      s += rung(76, [['A', 110, 'X0'], ['B', 190, 'X1'], ['C', 400, 'Y0']]) + rung(132, [['A', 110, 'Y0'], ['A', 190, 'X2'], ['C', 400, 'Y1']]);
      s += arrow(90, 20, 380, 20, { c: C.blue, w: 2, head: 9 }) + t(236, 10, '왼쪽 → 오른쪽 · 위 → 아래', { size: 13, b: 1, c: C.blue, a: 'm' });
      s += arrow(20, 60, 20, 148, { c: C.blue, w: 2, head: 9 });
      s += callout(400, 90, 330, 104, '코일은 오른쪽 끝', { a: 'e', c: C.orange, tc: C.orange, b: 1 });
      /* 잘못된 예 */
      s += t(40, 184, '✕ 코일 뒤에 접점', { size: 14, b: 1, c: C.red });
      s += line(40, 212, 40, 236, { c: C.ink, w: 3 }) + line(440, 212, 440, 236, { c: C.ink, w: 3 }) + line(40, 224, 88, 224, { c: C.ink, w: 2 }) + cA(110, 224) + line(132, 224, 218, 224, { c: C.ink, w: 2 }) + coil(240, 224, C.red) + line(262, 224, 318, 224, { c: C.ink, w: 2 }) + cA(340, 224) + line(362, 224, 440, 224, { c: C.ink, w: 2 });
      s += line(222, 206, 258, 242, { c: C.red, w: 2.4 }) + line(258, 206, 222, 242, { c: C.red, w: 2.4 });
      return F.svg(480, 252, s);
    });

  add('contacts', ['PLC 기본 명령어 — 매회 나옵니다'],
    '접점 기호 — A접점은 평소 열려 있다가 ON 이면 통하고, B접점은 평소 닫혀 있다가 ON 이면 끊긴다. 동그란 기호는 출력 코일',
    function () {
      var s = cA(90, 56) + cB(240, 56) + coil(390, 56);
      var nm = [['A접점', '평소 열림 (NO)'], ['B접점', '평소 닫힘 (NC)'], ['출력 코일', '연산 결과를 출력']], xs = [90, 240, 390];
      for (var i = 0; i < 3; i++) s += T(xs[i], 100, nm[i][0], { b: 1, size: 17, c: C.blue, ans: true }) + T(xs[i], 124, nm[i][1], { size: 13, c: C.sub, ans: true });
      s += T(90, 22, '①', { size: 15, b: 1, c: C.sub }) + T(240, 22, '②', { size: 15, b: 1, c: C.sub }) + T(390, 22, '③', { size: 15, b: 1, c: C.sub });
      return F.svg(480, 146, s);
    });

  add('timer', ['PLC 기본 명령어 — 매회 나옵니다'],
    '타이머 — TON 은 입력이 켜지고 설정시간(PT) 뒤에 출력 ON, TOF 는 입력이 꺼지고 설정시간 뒤에 출력 OFF',
    function () {
      var s = '', x0 = 76, a = 130, b = 330, pt = 90;
      function sig(y, on, off) { return poly([[x0, y], [on, y], [on, y - 22], [off, y - 22], [off, y], [462, y]], { c: C.blue, w: 2.4 }); }
      s += t(12, 20, 'TON (ON 딜레이)', { b: 1, size: 15, c: C.blue });
      s += t(12, 58, 'IN', { size: 14, b: 1 }) + sig(64, a, b) + t(12, 104, 'Q', { size: 14, b: 1 }) + sig(110, a + pt, b);
      s += F.dim(a, 118, a + pt, 118, 'PT', { off: -14, size: 13, c: C.orange });
      s += t(12, 158, 'TOF (OFF 딜레이)', { b: 1, size: 15, c: C.blue });
      s += t(12, 196, 'IN', { size: 14, b: 1 }) + sig(202, a, b) + t(12, 242, 'Q', { size: 14, b: 1 }) + sig(248, a, b + pt);
      s += F.dim(b, 256, b + pt, 256, 'PT', { off: -14, size: 13, c: C.orange });
      [a, b].forEach(function (x) { s += line(x, 30, x, 270, { c: C.grayM, w: 1, dash: '3 4' }); });
      return F.svg(480, 290, s);
    });

  /* ═══════════ CH09 HMI 프로그램 개발 ═══════════ */

  function pcIcon(x, y, c, lab) {
    c = c || C.ink;
    return box(x, y, 52, 36, { fill: '#fff', c: c, r: 3 }) + box(x + 18, y + 36, 16, 6, { fill: C.grayM, c: c, r: 0, w: 1 }) + box(x + 10, y + 42, 32, 4, { fill: C.grayM, c: c, r: 1, w: 1 }) +
      (lab ? T(x + 26, y + 18, lab, { size: 12, b: 1, c: c, halo: false }) : '');
  }

  add('hmiSys', ['HMI 시스템의 구성 방식'],
    'HMI 구성 방식 — 소규모는 한 대에 다 넣고(단독), 크면 나누고(분산), 신뢰성이 중요하면 두 벌로(이중화)',
    function () {
      var s = '';
      s += T(80, 20, '단독', { b: 1 }) + S(80, 40, '소규모 · 한 대에 다');
      s += box(24, 60, 112, 90, { fill: C.blueL, c: C.blue, r: 8 }) + S(80, 78, 'HMI', { b: 1, c: C.blue, halo: false }) + S(80, 100, '수집 · 저장', { c: C.ink, halo: false }) + S(80, 120, 'DB', { c: C.ink, halo: false });
      s += line(80, 150, 80, 180, { c: C.sub, w: 2 }) + dev(46, 180, 68, 30, 'PLC', C.ink, C.grayL, { size: 13 });
      s += line(160, 14, 160, 222, { c: C.edge, w: 1.4 });
      s += T(240, 20, '분산', { b: 1 }) + S(240, 40, '클라이언트 / 서버');
      s += pcIcon(172, 60, C.blue) + pcIcon(250, 60, C.blue) + line(170, 128, 312, 128, { c: C.sub, w: 3 }) + line(198, 106, 198, 128, { c: C.sub, w: 1.6 }) + line(276, 106, 276, 128, { c: C.sub, w: 1.6 });
      s += dev(172, 146, 64, 30, 'I/O 서버', C.ink, C.grayL, { size: 12 }) + dev(246, 146, 64, 30, '파일 서버', C.ink, C.grayL, { size: 12 }) + line(204, 128, 204, 146, { c: C.sub, w: 1.6 }) + line(278, 128, 278, 146, { c: C.sub, w: 1.6 });
      s += S(240, 200, '일부가 서도 나머지는 돎', { c: C.ink });
      s += line(320, 14, 320, 222, { c: C.edge, w: 1.4 });
      s += T(400, 20, '이중화', { b: 1 }) + S(400, 40, '높은 신뢰성');
      s += dev(334, 64, 60, 40, '주 서버', C.green, C.greenL, { size: 12 }) + dev(406, 64, 60, 40, '대기 서버', C.sub, '#fff', { size: 12 });
      s += arrow(394, 84, 406, 84, { c: C.green, w: 1.6, head: 7, both: 1 }) + S(400, 122, '동기화', { c: C.green, b: 1 });
      s += S(400, 150, '주 서버가 고장 나면', { c: C.ink }) + S(400, 170, '대기 서버로 자동 절체', { c: C.ink, b: 1 });
      return F.svg(480, 230, s);
    });

  add('hmiChain', ['HMI의 제어 구성'],
    'HMI 는 PLC 내부 메모리를 읽어(Read) 상태를 띄우고, 써서(Write) 장비를 조작한다 — HMI PC → PLC → 기계장비',
    function () {
      var s = pcIcon(20, 60, C.blue, 'HMI') + T(46, 134, 'HMI PC', { b: 1, c: C.blue, size: 14 });
      s += box(170, 44, 120, 100, { fill: C.grayL, c: C.ink, r: 8 }) + T(230, 62, 'PLC 메모리', { size: 14, b: 1, halo: false });
      var bits = '1 0 1 1 0 0 1 0'.split(' ');
      for (var k = 0; k < 8; k++) s += box(182 + (k % 4) * 24, 78 + Math.floor(k / 4) * 26, 22, 22, { fill: bits[k] === '1' ? C.greenL : '#fff', c: C.sub, r: 2, w: 1, label: bits[k], size: 12, b: 0 });
      s += arrow(168, 76, 82, 76, { c: C.blue, w: 2, head: 9 }) + t(124, 64, 'Read', { size: 13, b: 1, c: C.blue, a: 'm' });
      s += arrow(82, 104, 168, 104, { c: C.orange, w: 2, head: 9 }) + t(124, 122, 'Write', { size: 13, b: 1, c: C.orange, a: 'm' });
      s += arrow(290, 94, 330, 94, { w: 2, head: 9 });
      ['모터', '센서', '엔코더', '로드셀'].forEach(function (n, i) { s += dev(334 + (i % 2) * 68, 50 + Math.floor(i / 2) * 50, 62, 36, n, C.ink, '#fff', { size: 13 }); });
      s += T(400, 160, '기계장비', { size: 14, b: 1 });
      s += S(240, 196, '① 상태화면 표시 · ② 조작 및 설정 · ③ 데이터베이스', { c: C.ink, b: 1 });
      return F.svg(480, 214, s);
    });

  add('hmiScreen', ['HMI 화면의 구성'],
    'HMI 화면(모형) — 버튼 · 램프 · 계기 · 트렌드 그래프 · 알람 같은 그래픽 요소를 실물에 가깝게 배치한다',
    function () {
      var s = box(20, 16, 440, 238, { fill: '#1f2937', c: C.ink, r: 10 }) + box(20, 16, 440, 26, { fill: '#374151', c: C.ink, r: 10 }) + t(34, 29, '1라인 공정 모니터링', { size: 13, c: '#fff', halo: false });
      /* 탱크 + 배관 */
      s += box(40, 60, 60, 80, { fill: '#e5e7eb', c: '#9ca3af', r: 6 }) + box(42, 96, 56, 42, { fill: '#60a5fa', c: 'none', r: 4, w: 0 }) + line(100, 120, 150, 120, { c: '#9ca3af', w: 5 }) + circ(162, 120, 12, { fill: '#9ca3af', c: '#e5e7eb' });
      /* 램프 */
      s += circ(210, 70, 11, { fill: '#22c55e', c: '#bbf7d0', w: 2 }) + circ(244, 70, 11, { fill: '#4b5563', c: '#6b7280', w: 2 }) + t(210, 92, 'RUN', { size: 11, c: '#e5e7eb', a: 'm', halo: false }) + t(244, 92, 'STOP', { size: 11, c: '#e5e7eb', a: 'm', halo: false });
      /* 버튼 */
      s += box(196, 112, 60, 26, { fill: '#16a34a', c: '#bbf7d0', r: 5, label: '시작', lc: '#fff', size: 13 }) + box(196, 144, 60, 26, { fill: '#dc2626', c: '#fecaca', r: 5, label: '정지', lc: '#fff', size: 13 });
      /* 계기 */
      s += path('M286,120 A40,40 0 0 1 366,120', { c: '#e5e7eb', w: 8 }) + path('M286,120 A40,40 0 0 1 340,82', { c: '#f59e0b', w: 8 }) + line(326, 120, 344, 90, { c: '#fff', w: 2.4 }) + t(326, 138, '0.52 MPa', { size: 12, c: '#e5e7eb', a: 'm', halo: false });
      /* 트렌드 */
      s += box(384, 56, 64, 90, { fill: '#111827', c: '#4b5563', r: 3, w: 1 }) + poly([[388, 120], [398, 110], [408, 116], [418, 96], [428, 100], [438, 84], [446, 88]], { c: '#38bdf8', w: 2 });
      /* 알람 */
      s += box(36, 190, 408, 26, { fill: '#7f1d1d', c: '#ef4444', r: 4 }) + t(48, 203, '⚠ 10:42  2번 컨베이어 과부하', { size: 13, c: '#fff', halo: false });
      s += box(36, 222, 408, 22, { fill: '#374151', c: '#4b5563', r: 4 }) + t(48, 233, '10:15  탱크 수위 낮음 — 복구', { size: 12, c: '#d1d5db', halo: false });
      /* 이름표 */
      s += t(70, 276, '공정 화면', { size: 13, b: 1, c: C.blue, a: 'm' }) + line(70, 266, 70, 144, { c: C.blue, w: 1 });
      s += t(160, 276, '램프·버튼', { size: 13, b: 1, c: C.blue, a: 'm' }) + line(180, 266, 214, 172, { c: C.blue, w: 1 });
      s += t(270, 276, '계기', { size: 13, b: 1, c: C.blue, a: 'm' }) + line(280, 266, 310, 146, { c: C.blue, w: 1 });
      s += t(352, 276, '트렌드', { size: 13, b: 1, c: C.blue, a: 'm' }) + line(370, 266, 416, 150, { c: C.blue, w: 1 });
      s += t(432, 276, '알람', { size: 13, b: 1, c: C.red, a: 'm' }) + line(440, 266, 440, 218, { c: C.red, w: 1 });
      return F.svg(480, 290, s);
    });

  add('cross', ['케이블 점검과 노이즈 대책'],
    'RS-232C 는 TX·RX 를 엇갈려 잇고 SG 끼리 잇는다. 이더넷은 다른 장비끼리 다이렉트, 같은 장비끼리 크로스(1·2 ↔ 3·6)',
    function () {
      var s = t(12, 20, 'RS-232C', { b: 1, size: 15, c: C.blue });
      var pins = ['TX', 'RX', 'SG'];
      for (var i = 0; i < 3; i++) {
        var y = 44 + i * 30;
        s += box(40, y - 12, 56, 24, { fill: C.grayL, c: C.ink, r: 4, label: pins[i], size: 13 }) + box(384, y - 12, 56, 24, { fill: C.grayL, c: C.ink, r: 4, label: pins[i], size: 13 });
      }
      s += line(96, 44, 384, 74, { c: C.orange, w: 2.2 }) + line(96, 74, 384, 44, { c: C.orange, w: 2.2 }) + line(96, 104, 384, 104, { c: C.ink, w: 2.2 });
      s += S(68, 128, '기기 A', { b: 1 }) + S(412, 128, '기기 B', { b: 1 }) + S(240, 128, '보내는 선 ↔ 받는 선 엇갈림', { c: C.orange, b: 1 });
      s += line(12, 144, 468, 144, { c: C.edge, w: 1.4 });
      function eth(x0, cross, ttl, sub) {
        var o = T(x0 + 100, 164, ttl, { b: 1, size: 15, c: C.blue }) + S(x0 + 100, 184, sub, { c: C.ink });
        var pp = [1, 2, 3, 6], map = cross ? { 1: 3, 2: 6, 3: 1, 6: 2 } : { 1: 1, 2: 2, 3: 3, 6: 6 };
        pp.forEach(function (p, k) {
          var y = 204 + k * 22, k2 = pp.indexOf(map[p]), y2 = 204 + k2 * 22;
          o += box(x0 + 10, y - 9, 30, 18, { fill: C.grayL, c: C.ink, r: 3, label: String(p), size: 12, w: 1 }) + box(x0 + 160, y - 9, 30, 18, { fill: C.grayL, c: C.ink, r: 3, label: String(p), size: 12, w: 1 });
          o += line(x0 + 40, y, x0 + 160, y2, { c: cross && p !== map[p] ? C.orange : C.ink, w: 1.8 });
        });
        return o;
      }
      s += eth(20, false, '다이렉트', '다른 장비끼리 (PC–허브)') + eth(260, true, '크로스', '같은 장비끼리 (PC–PC)');
      return F.svg(480, 292, s);
    });

  /* ═══════════ CH10 전기·전자장치 조립 ═══════════ */

  function arcArrow(cx, cy, r, a0, a1, o) {   /* 각도(도) a0 → a1 로 도는 둥근 화살표 */
    var p = [], k = 24;
    for (var i = 0; i <= k; i++) { var a = (a0 + (a1 - a0) * i / k) * Math.PI / 180; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return F.route(p, o || {});
  }

  add('indexTable', ['조립 부품 — 인덱스 테이블·스테핑 모터·진공 발생기'],
    '인덱스 테이블은 정해진 각도씩 돌며 공정을 차례로 거치게 하고, 그 각도는 스테핑 모터가 펄스 수로 맞춘다',
    function () {
      var cx = 118, cy = 132, s = circ(cx, cy, 78, { fill: C.grayL, c: C.ink, w: 2 }) + circ(cx, cy, 10, { fill: '#fff', c: C.ink, w: 2 });
      for (var k = 0; k < 4; k++) {
        var a = k * Math.PI / 2 - Math.PI / 2, x = cx + 52 * Math.cos(a), y = cy + 52 * Math.sin(a);
        s += box(x - 13, y - 13, 26, 26, { fill: C.orangeL, c: C.orange, r: 3 });
        s += T(cx + 100 * Math.cos(a), cy + 100 * Math.sin(a) + (k === 0 ? 6 : 0), '공정 ' + (k + 1), { size: 13, b: 1 });
      }
      s += arcArrow(cx, cy, 90, -60, -20, { c: C.blue, w: 2.2, head: 9 }) + t(cx + 60, 30, '일정 각도씩', { size: 13, b: 1, c: C.blue, a: 's' });
      var p = [], x0 = 262;
      for (k = 0; k < 5; k++) { p.push([x0 + k * 18, 70], [x0 + k * 18, 50], [x0 + k * 18 + 8, 50], [x0 + k * 18 + 8, 70], [x0 + k * 18 + 18, 70]); }
      s += poly(p, { c: C.blue, w: 2 }) + t(262, 32, 'PLC 펄스', { size: 13, b: 1, c: C.blue });
      s += arrow(356, 60, 380, 60, { w: 1.6, head: 8 }) + box(384, 36, 80, 50, { fill: C.blueL, c: C.blue, r: 6, label: '스테핑', lc: C.blue, size: 14 });
      s += t(262, 118, '펄스 1개 = 정해진 각도', { size: 14, b: 1 });
      s += t(262, 146, 'full step  1.8°', { size: 14 }) + t(262, 170, '2분할  0.9°', { size: 14 }) + t(262, 194, '16분할  0.1125°', { size: 14 });
      s += t(262, 220, '(드라이버 DIP 스위치로 분할)', { size: 13, c: C.sub });
      return F.svg(480, 238, s);
    });

  add('ejector', ['조립 부품 — 인덱스 테이블·스테핑 모터·진공 발생기'],
    '진공 발생기(이젝터) — 압축 공기가 좁은 목을 빠르게 지나며 압력이 대기압보다 낮아지고, 그 부압으로 부품을 빨아 든다',
    function () {
      var s = path('M20,66 H150 L196,88 H244 L296,60 H460 V140 H296 L244,112 H196 L150,134 H20 Z', { fill: C.blueL, c: C.ink, w: 2 });
      s += arrow(30, 100, 130, 100, { c: C.green, w: 2.2, head: 9 }) + arrow(186, 100, 256, 100, { c: C.green, w: 3.2, head: 11 }) + arrow(320, 100, 450, 100, { c: C.green, w: 2.2, head: 9 });
      s += t(24, 50, '공급(압축 공기)', { size: 14, b: 1 }) + t(456, 50, '배기', { size: 14, b: 1, a: 'e' });
      s += box(212, 112, 16, 70, { fill: C.blueL, c: C.ink, r: 0, w: 2 }) + box(216, 110, 8, 6, { fill: C.blueL, c: 'none', r: 0, w: 0 });
      s += arrow(220, 176, 220, 124, { c: C.blue, w: 2, head: 8 }) + t(234, 150, '진공(부압)', { size: 14, b: 1, c: C.blue });
      s += path('M186,182 H254 L262,198 H178 Z', { fill: C.grayM, c: C.ink, w: 1.6 }) + box(170, 198, 100, 26, { fill: C.orangeL, c: C.orange, r: 3, label: '부품', lc: C.orange, size: 13 });
      s += T(220, 30, '좁은 목 — 빨라지고 압력↓', { size: 14, b: 1, c: C.red }) + line(220, 40, 220, 86, { c: C.red, w: 1, dash: '3 3' });
      s += t(300, 196, '포트 셋 — 공급 · 배기 · 진공', { size: 13, c: C.sub });
      return F.svg(480, 236, s);
    });

  add('meters', ['기능 검사 측정기 네 가지'],
    '측정기는 축으로 구분한다 — 오실로스코프(전압–시간), 스펙트럼 애널라이저(전력–주파수), 로직 애널라이저(H/L 여러 채널)',
    function () {
      var s = '', nm = ['오실로스코프', '스펙트럼 분석기', '로직 분석기'], sub = [['세로 전압', '가로 시간'], ['세로 전력·전압', '가로 주파수'], ['H / L 두 값', '16~64 채널']];
      for (var i = 0; i < 3; i++) {
        var x = 8 + i * 158, y = 36;
        s += T(x + 74, 20, nm[i], { size: 14, b: 1 });
        s += box(x, y, 148, 108, { fill: '#0f172a', c: C.ink, r: 6 });
        for (var g = 1; g < 4; g++) s += line(x + 4, y + g * 27, x + 144, y + g * 27, { c: '#334155', w: 1 }) + line(x + g * 37, y + 4, x + g * 37, y + 104, { c: '#334155', w: 1 });
        if (i === 0) s += poly(sinePts(x + 6, 136, y + 54, 34, 2.5, 0), { c: '#4ade80', w: 2.2 });
        else if (i === 1) { [[20, 30], [44, 80], [70, 44], [100, 62], [124, 20]].forEach(function (b) { s += line(x + b[0], y + 100, x + b[0], y + 100 - b[1], { c: '#fbbf24', w: 4 }); }); s += line(x + 6, y + 100, x + 142, y + 100, { c: '#fbbf24', w: 1.4 }); }
        else {
          for (var ch = 0; ch < 4; ch++) {
            var yy = y + 20 + ch * 24, p = [[x + 6, yy]], hi = false, xx = x + 6;
            [18, 30, 14, 26, 20, 28].forEach(function (w, k) { xx += w; if (xx > x + 142) xx = x + 142; p.push([xx, hi ? yy - 12 : yy]); hi = (k + ch) % 2 === 0; p.push([xx, hi ? yy - 12 : yy]); });
            s += poly(p, { c: '#38bdf8', w: 1.8 });
          }
        }
        s += S(x + 74, 164, sub[i][0], { c: C.ink, b: 1 }) + S(x + 74, 184, sub[i][1], { c: C.ink, b: 1 });
      }
      return F.svg(480, 202, s);
    });

  add('safety4', ['안전 검사 네 가지 항목', '안전성 검사 측정기', '인증 테스트 — 내전압·절연저항·누설전류·접지'],
    '안전 검사 네 가지 — 어디와 어디 사이를 재나(충전부 = 전기가 흐르는 곳, 외함 = 손이 닿는 금속)',
    function () {
      var s = '';
      function gnd(x, y) { return line(x, y, x, y + 8, { c: C.ink, w: 2 }) + line(x - 12, y + 8, x + 12, y + 8, { c: C.ink, w: 2 }) + line(x - 7, y + 13, x + 7, y + 13, { c: C.ink, w: 2 }) + line(x - 3, y + 18, x + 3, y + 18, { c: C.ink, w: 2 }); }
      function cell(i, ttl, sub, L, M, Rk) {
        var x = 8 + (i % 2) * 236, y = 8 + Math.floor(i / 2) * 128, o = box(x, y, 228, 120, { fill: '#fff', c: C.edge, r: 10 });
        o += t(x + 12, y + 18, ttl, { size: 15, b: 1, c: C.blue, ans: true }) + t(x + 12, y + 104, sub, { size: 13, c: C.sub, ans: true });
        o += L === '외함' ? dev(x + 12, y + 40, 62, 32, '외함', C.ink, C.grayM, { size: 13 }) : dev(x + 12, y + 40, 62, 32, '충전부', C.orange, C.orangeL, { size: 13 });
        o += line(x + 74, y + 56, x + 98, y + 56, { c: C.ink, w: 2 }) + circ(x + 114, y + 56, 16, { fill: C.blueL, c: C.blue, w: 1.8 }) + T(x + 114, y + 57, M, { size: 12, b: 1, c: C.blue, halo: false }) + line(x + 130, y + 56, x + 154, y + 56, { c: C.ink, w: 2 });
        if (Rk === 'gnd') o += gnd(x + 170, y + 56) + line(x + 154, y + 56, x + 170, y + 56, { c: C.ink, w: 2 }) + S(x + 196, y + 60, '접지', { a: 's', c: C.ink });
        else o += dev(x + 154, y + 40, 62, 32, '외함', C.ink, C.grayM, { size: 13 });
        return o;
      }
      s += cell(0, '① 내전압', '높은 전압을 견디나', '충전부', 'kV', '외함');
      s += cell(1, '② 절연 저항', '새는 길 없이 막혔나(MΩ)', '충전부', 'MΩ', '외함');
      s += cell(2, '③ 누설 전류', '몸을 거쳐 새는 전류 — 0.5mA', '외함', 'mA', 'gnd');
      s += cell(3, '④ 접지 연속성', '외함까지 접지가 이어졌나', '외함', 'Ω', 'gnd');
      return F.svg(480, 266, s);
    });

  /* ═══════════ CH11 센서 활용기술 ═══════════ */

  add('sensorSpec', ['센서의 성능 특성 여섯 가지'],
    '센서의 성능 — 감도는 입출력 직선의 기울기, 직선성은 곧은 선에 가까운 정도, 응답 속도는 새 값에 닿기까지의 시간',
    function () {
      var s = axes(40, 176, 180, 150, '입력', '출력');
      s += line(40, 176, 210, 50, { c: C.blue, w: 2.4 }) + path('M40,176 C100,150 150,90 210,62', { c: C.orange, w: 1.8, dash: '6 4' });
      s += poly([[110, 124], [150, 124], [150, 94]], { c: C.green, w: 1.6 }) + t(130, 138, 'Δ입력', { size: 13, c: C.green, a: 'm' }) + t(156, 110, 'Δ출력', { size: 13, c: C.green });
      s += t(40, 204, '감도 = 기울기(Δ출력 ÷ Δ입력)', { size: 13, b: 1, c: C.green }) + t(40, 224, '점선 — 곧은 선에서 벗어남(직선성↓)', { size: 13, c: C.orange, ans: true });
      s += axes(270, 176, 196, 150, '시간', '');
      s += poly([[270, 150], [300, 150], [300, 70], [456, 70]], { c: C.grayM, w: 2, dash: '5 4' });
      var p = [[270, 150], [300, 150]];
      for (var k = 0; k <= 30; k++) { var u = k / 30; p.push([300 + 150 * u, 150 - 80 * (1 - Math.exp(-4 * u))]); }
      s += poly(p, { c: C.blue, w: 2.4 }) + F.dim(300, 150, 380, 150, '응답 시간', { off: -16, size: 13, c: C.red });
      s += t(282, 204, '입력이 바뀐 뒤 출력이', { size: 13, c: C.ink }) + t(282, 224, '새 값에 닿기까지', { size: 13, c: C.ink });
      return F.svg(480, 240, s);
    });

  add('outTypes', ['센서의 분류와 선정 기준'],
    '센서의 출력 형식 네 가지 — 아날로그(연속) · 디지털(0/1) · 주파수형(펄스 빠르기) · 2진형(ON/OFF 하나)',
    function () {
      var rows = [['아날로그', '조도 · NTC · 가변저항'], ['디지털', '앱솔루트 엔코더 · PIR'], ['주파수형', '인크리멘털 엔코더 · RPM'], ['2진형', '리미트 스위치 · 근접']], s = '';
      rows.forEach(function (r, i) {
        var y = 40 + i * 54;
        s += t(12, y, r[0], { b: 1, size: 15 }) + line(100, y + 16, 300, y + 16, { c: C.edge, w: 1 });
        var p;
        if (i === 0) p = sinePts(100, 200, y, 14, 1.3, 0.4);
        else if (i === 1) { p = []; var b = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0]; b.forEach(function (v, k) { p.push([100 + k * 20, v ? y - 12 : y + 12], [120 + k * 20, v ? y - 12 : y + 12]); }); }
        else if (i === 2) { p = [[100, y + 12]]; var xx = 100, ws = [8, 8, 8, 8, 10, 14, 18, 22, 26]; ws.forEach(function (w) { p.push([xx, y - 12], [xx + w / 2, y - 12], [xx + w / 2, y + 12], [xx + w, y + 12]); xx += w; }); p.push([300, y + 12]); }
        else p = [[100, y + 12], [170, y + 12], [170, y - 12], [300, y - 12]];
        s += poly(p, { c: C.blue, w: 2.2 }) + t(314, y, r[1], { size: 13, c: C.sub });
      });
      return F.svg(480, 250, s);
    });

  add('sensorTree', ['센서의 분류와 선정 기준'],
    '센서 고르기 — 무엇을 알고 싶은지(검출 대상)부터 정하고, 환경과 닿아도 되는지를 따진다',
    function () {
      var s = dev(170, 10, 140, 34, '검출 대상', C.ink, '#fff', { size: 15 });
      s += line(240, 44, 240, 60, { c: C.sub, w: 2 }) + line(60, 60, 420, 60, { c: C.sub, w: 2 });
      var n = [['있나 없나', '근접 · 광', C.green, C.greenL], ['얼마나 뜨겁나', '열전대 · RTD', C.red, C.redL], ['얼마나 도나', '엔코더 · 리졸버', C.blue, C.blueL], ['얼마나 세나', '로드셀 · 압력', C.orange, C.orangeL]];
      n.forEach(function (q, k) {
        var cx = 60 + k * 120;
        s += line(cx, 60, cx, 74, { c: C.sub, w: 2 }) + dev(cx - 56, 74, 112, 34, q[0], q[2], q[3], { size: 14 }) + S(cx, 124, q[1], { c: C.ink });
      });
      s += box(12, 146, 456, 40, { fill: C.grayL, c: C.edge, r: 10 }) + T(240, 166, '고를 때 — 무엇을 · 어떤 환경에서 · 닿아도 되는지', { size: 14, b: 1, halo: false });
      return F.svg(480, 198, s);
    });

  add('sensorChain', ['센서의 구성요소와 스마트 센서'],
    '스마트 센서의 전기적 구성 — 센서 소자 → 신호 조절 → ADC → 마이크로프로세서 → 통신·메모리',
    function () {
      var st = [['센서 소자', '물리량', '→ 전기'], ['신호 조절', '증폭·필터', '브리지'], ['ADC', '아날로그', '→ 디지털'], ['MCU', '계산·보정', '판단'], ['통신', '유·무선', '메모리']], s = '';
      st.forEach(function (q, k) {
        var x = 8 + k * 94, sm = k >= 2;
        s += box(x, 64, 84, 90, { fill: sm ? C.blueL : C.grayL, c: sm ? C.blue : C.ink, r: 8 });
        s += T(x + 42, 86, q[0], { b: 1, size: 14, c: sm ? C.blue : C.ink, halo: false }) + S(x + 42, 112, q[1], { c: C.ink, halo: false }) + S(x + 42, 132, q[2], { c: C.ink, halo: false });
        if (k < 4) s += arrow(x + 85, 109, x + 93, 109, { w: 1.4, head: 6 });
      });
      s += poly([[8, 50], [8, 42], [184, 42], [184, 50]], { c: C.sub, w: 1.4 }) + T(96, 28, '센서가 원래 하던 일', { size: 13, c: C.sub, b: 1 });
      s += poly([[196, 50], [196, 42], [466, 42], [466, 50]], { c: C.blue, w: 1.4 }) + T(331, 28, '스마트 센서가 더한 것', { size: 13, c: C.blue, b: 1 });
      s += S(240, 180, '자가진단 · 교정 · 통신까지 센서 안에서', { c: C.ink, b: 1 });
      return F.svg(480, 198, s);
    });

  add('photo', ['광센서와 근접 센서'],
    '광전 센서는 빛이 가려지는 것으로, 유도형 근접 센서는 금속에 생기는 와전류로 물체를 닿지 않고 알아챈다',
    function () {
      var s = '';
      /* 투과형 */
      s += t(12, 22, '투과형', { b: 1, size: 15 });
      s += dev(12, 34, 52, 30, '투광', C.orange, C.orangeL, { size: 13 }) + line(64, 49, 140, 49, { c: C.red, w: 2, dash: '6 4' }) + box(142, 30, 30, 40, { fill: C.grayM, c: C.ink, r: 3 }) + line(172, 49, 230, 49, { c: C.grayM, w: 1.4, dash: '3 5' }) + dev(232, 34, 52, 30, '수광', C.blue, C.blueL, { size: 13 });
      s += t(300, 49, '물체가 빛을 가림', { size: 13, c: C.ink });
      /* 반사형(미러) */
      s += t(12, 102, '반사형(미러)', { b: 1, size: 15 });
      s += box(12, 114, 64, 44, { fill: C.grayL, c: C.ink, r: 4 }) + S(44, 128, '투광', { c: C.orange, b: 1, halo: false }) + S(44, 146, '수광', { c: C.blue, b: 1, halo: false });
      s += line(76, 126, 250, 126, { c: C.red, w: 2, dash: '6 4' }) + line(250, 146, 76, 146, { c: C.red, w: 2, dash: '6 4' }) + box(250, 112, 10, 48, { fill: C.blueL, c: C.blue, r: 1 }) + t(266, 136, '미러', { size: 13, b: 1, c: C.blue });
      s += t(300, 158, '한 몸 + 미러', { size: 13, c: C.ink });
      /* 유도형 근접 */
      s += t(12, 188, '유도형 근접', { b: 1, size: 15 });
      s += box(12, 204, 96, 44, { fill: C.grayL, c: C.ink, r: 4 }) + box(108, 208, 10, 36, { fill: C.orangeL, c: C.orange, r: 2 }) + S(60, 226, '코일·발진', { c: C.ink, halo: false });
      for (var k = 0; k < 3; k++) s += path('M118,' + (212 + k * 4) + ' C' + (150 + k * 12) + ',' + (200 - k * 8) + ' ' + (150 + k * 12) + ',' + (252 + k * 8) + ' 118,' + (240 - k * 4), { c: C.orange, w: 1.2, dash: '3 3' });
      s += box(176, 200, 26, 52, { fill: C.grayM, c: C.ink, r: 2 }) + ell(189, 226, 7, 14, { c: C.red, w: 1.6 }) + t(210, 214, '금속', { size: 13, b: 1 });
      s += t(210, 236, '와전류', { size: 13, b: 1, c: C.red, ans: true });
      s += t(300, 226, '금속만 · 가깝게', { size: 13, c: C.ink }) + t(300, 246, '(정전용량형은 비금속도)', { size: 13, c: C.sub, ans: true });
      return F.svg(480, 264, s);
    });

  add('thermo', ['온도 센서와 압력 센서'],
    '열전대 — 다른 두 금속을 이은 접점에 온도차가 생기면 전압(열기전력)이 나온다. 아래는 온도 센서별 쓰는 범위',
    function () {
      var s = '';
      s += path('M40,96 C28,80 44,72 38,58 C52,66 60,80 52,96 Z', { fill: C.orangeL, c: C.orange, w: 1.4 });
      s += dot(58, 80, 6, C.ink) + T(58, 116, '측온 접점', { size: 13, b: 1 });
      s += poly([[58, 80], [110, 56], [250, 56]], { c: C.blue, w: 3 }) + poly([[58, 80], [110, 104], [250, 104]], { c: C.orange, w: 3 });
      s += t(140, 44, '금속 A', { size: 13, b: 1, c: C.blue }) + t(140, 118, '금속 B', { size: 13, b: 1, c: C.orange });
      s += box(250, 44, 44, 72, { fill: C.grayL, c: C.ink, r: 4 }) + T(272, 132, '기준접점', { size: 13, b: 1 }) + S(272, 150, '온도 보상');
      s += line(294, 56, 360, 56, { c: C.ink, w: 2 }) + line(294, 104, 360, 104, { c: C.ink, w: 2 }) + line(360, 56, 360, 64, { c: C.ink, w: 2 }) + line(360, 104, 360, 96, { c: C.ink, w: 2 });
      s += circ(360, 80, 16, { fill: '#fff', c: C.ink, w: 2, label: 'mV', size: 12 });
      s += t(388, 70, '온도차', { size: 13, b: 1 }) + t(388, 90, '→ 전압', { size: 13, b: 1 }) + t(388, 110, '(제벡효과)', { size: 13, c: C.red, b: 1, ans: true });
      function X(v) { return 150 + (v + 200) * 0.14; }
      var rg = [['열전대', -200, 1800], ['RTD(백금)', -200, 600], ['서미스터 NTC', -50, 300], ['적외선', -50, 2000], ['반도체 IC', -55, 150]];
      s += line(X(0), 176, X(0), 290, { c: C.grayM, w: 1, dash: '3 3' }) + line(X(1000), 176, X(1000), 290, { c: C.grayM, w: 1, dash: '3 3' });
      s += T(X(0), 300, '0℃', { size: 13, c: C.sub }) + T(X(1000), 300, '1000℃', { size: 13, c: C.sub }) + T(X(2000) - 8, 300, '2000℃', { size: 13, c: C.sub });
      rg.forEach(function (r, i) {
        var y = 184 + i * 21;
        s += t(16, y, r[0], { size: 13 }) + box(X(r[1]), y - 7, X(r[2]) - X(r[1]), 14, { fill: i === 0 ? C.orange : C.blueL, c: i === 0 ? C.orange : C.blue, r: 3, w: 1 });
        if (i === 3) s += t(X(r[2]) + 2, y, '+', { size: 13, b: 1, c: C.blue });
      });
      return F.svg(480, 312, s);
    });

  add('hall', ['자기 센서와 모션 센서'],
    '홀 효과 — 전류가 흐르는 판에 수직으로 자기장을 걸면 옆 두 모서리 사이에 홀 전압이 생긴다',
    function () {
      var s = poly([[110, 100], [330, 100], [380, 160], [160, 160]], { close: 1, fill: C.grayL, c: C.ink, w: 2 });
      [180, 240, 300].forEach(function (x) { s += arrow(x, 24, x, 92, { c: C.blue, w: 2, head: 9 }) + line(x, 168, x, 196, { c: C.blue, w: 1.4, dash: '4 4' }); });
      s += t(318, 30, '자기장 B (수직)', { size: 14, b: 1, c: C.blue });
      s += arrow(40, 130, 150, 130, { c: C.orange, w: 3, head: 11 }) + line(356, 130, 410, 130, { c: C.orange, w: 3 }) + t(40, 112, '전류 I', { size: 14, b: 1, c: C.orange });
      s += t(222, 94, '+', { size: 18, b: 1, c: C.red, a: 'm' }) + t(262, 174, '−', { size: 20, b: 1, c: C.red, a: 'm' });
      s += route([[330, 100], [420, 100], [420, 176]], { c: C.red, w: 1.6, head: 0 }) + line(380, 160, 400, 190, { c: C.red, w: 1.6 });
      s += circ(420, 196, 14, { fill: '#fff', c: C.red, w: 2, label: 'V', size: 14, lc: C.red }) + line(400, 190, 406, 196, { c: C.red, w: 1.6 });
      s += t(456, 222, '홀 전압', { size: 14, b: 1, c: C.red, a: 'e', ans: true });
      s += S(200, 222, '쓰는 곳 — ABS · 모터 회전 검출 · 전류 센서', { c: C.ink });
      return F.svg(480, 240, s);
    });

  /* ═══════════ CH12 모터 제어 ═══════════ */

  add('slip', ['교류 전동기 — 유도와 동기'],
    '유도 전동기의 회전자는 회전 자기장(Ns)보다 조금 늦게 돈다(슬립). 동기 전동기는 똑같이 돈다(슬립 0)',
    function () {
      var s = '';
      [[118, '유도 전동기', 'N 이 Ns 보다 조금 늦음', '슬립 > 0', 60], [362, '동기 전동기', 'N 과 Ns 가 같음', '슬립 = 0', 120]].forEach(function (q, i) {
        var cx = q[0], cy = 118;
        s += T(cx, 20, q[1], { b: 1, size: 16 });
        s += circ(cx, cy, 70, { fill: C.grayL, c: C.ink, w: 2 }) + circ(cx, cy, 44, { fill: '#fff', c: C.ink, w: 1.6 }) + circ(cx, cy, 6, { fill: C.ink, c: C.ink });
        s += arcArrow(cx, cy, 58, -170, -50, { c: C.blue, w: 3, head: 10 }) + t(cx + 36, cy - 64, 'Ns', { size: 14, b: 1, c: C.blue });
        s += arcArrow(cx, cy, 30, -170, -170 + q[4], { c: C.orange, w: 3, head: 9 }) + T(cx, cy + 20, 'N', { size: 14, b: 1, c: C.orange });
        s += S(cx, 212, q[2], { c: C.ink }) + T(cx, 234, q[3], { size: 15, b: 1, c: i ? C.green : C.red });
      });
      s += S(240, 262, '파랑 = 고정자가 만드는 회전 자기장 · 주황 = 회전자', { c: C.sub });
      return F.svg(480, 276, s);
    });

  add('dcMotor', ['직류 전동기'],
    '직류 전동기 — 계자(고정자)가 자계를 만들고, 브러시·정류자로 들어온 전류가 전기자 코일에 힘을 내며, 정류자가 전류 방향을 바꿔 계속 돌게 한다',
    function () {
      var s = box(20, 50, 70, 130, { fill: C.redL, c: C.red, r: 6, label: 'N', lc: C.red, size: 22 }) + box(390, 50, 70, 130, { fill: C.blueL, c: C.blue, r: 6, label: 'S', lc: C.blue, size: 22 });
      s += T(240, 24, '계자(고정자) — 자계를 만든다', { size: 14, b: 1 });
      s += poly([[150, 70], [330, 70], [330, 160], [262, 160]], { c: C.orange, w: 4 }) + poly([[218, 160], [150, 160], [150, 70]], { c: C.orange, w: 4 });
      s += line(262, 160, 262, 196, { c: C.orange, w: 3 }) + line(218, 160, 218, 196, { c: C.orange, w: 3 });
      s += path('M214,196 A28,28 0 0 0 214,248', { c: C.ink, w: 7 }) + path('M266,196 A28,28 0 0 1 266,248', { c: C.ink, w: 7 });
      s += box(170, 212, 28, 20, { fill: C.grayM, c: C.ink, r: 2 }) + box(282, 212, 28, 20, { fill: C.grayM, c: C.ink, r: 2 });
      s += line(170, 222, 130, 222, { c: C.ink, w: 2 }) + line(310, 222, 350, 222, { c: C.ink, w: 2 }) + t(122, 222, '+', { size: 18, b: 1, c: C.red, a: 'e' }) + t(358, 222, '−', { size: 20, b: 1, c: C.blue, a: 's' });
      s += arrow(150, 118, 150, 88, { c: C.green, w: 2.4, head: 9 }) + arrow(330, 104, 330, 134, { c: C.green, w: 2.4, head: 9 }) + t(124, 102, '힘', { size: 13, b: 1, c: C.green, a: 'e' });
      s += callout(300, 70, 330, 40, '전기자 코일(회전자)', { a: 's', size: 13 });
      s += callout(240, 244, 240, 270, '정류자 — 전류 방향을 바꾼다', { a: 'm', size: 13 }) + callout(176, 230, 100, 254, '브러시', { a: 'e', size: 13 });
      return F.svg(480, 284, s);
    });

  add('servoStep', ['서보모터와 스테핑 모터'],
    '서보모터는 엔코더로 실제 위치를 재어 되먹이고(정밀), 스테핑 모터는 펄스 수만큼 정해진 각도씩 돈다(되먹임 없음)',
    function () {
      var s = t(12, 20, '서보모터', { b: 1, size: 16, c: C.blue });
      s += t(12, 62, '지령', { size: 14 }) + arrow(48, 62, 88, 62, { w: 1.8, head: 8 }) + dev(90, 42, 96, 40, '드라이버', C.ink, C.grayL, { size: 14 });
      s += arrow(186, 62, 216, 62, { w: 1.8, head: 8 }) + dev(218, 42, 96, 40, '서보모터', C.blue, C.blueL, { size: 14 }) + circ(330, 62, 12, { fill: C.greenL, c: C.green, w: 1.6 });
      s += route([[330, 74], [330, 104], [138, 104], [138, 84]], { c: C.green, w: 1.8, head: 8, dash: '5 4' }) + t(346, 96, '엔코더로 재어 되먹임', { size: 13, b: 1, c: C.green });
      s += line(20, 128, 460, 128, { c: C.edge, w: 1.4 });
      s += t(12, 150, '스테핑 모터', { b: 1, size: 16, c: C.orange });
      var p = [], x = 20;
      for (var k = 0; k < 4; k++) { p.push([x, 200], [x, 180], [x + 8, 180], [x + 8, 200], [x + 16, 200]); x += 16; }
      s += poly(p, { c: C.orange, w: 2 }) + S(52, 220, '펄스 4개');
      s += arrow(86, 192, 104, 192, { w: 1.8, head: 8 }) + dev(106, 172, 96, 40, '드라이버', C.ink, C.grayL, { size: 14 }) + arrow(202, 192, 232, 192, { w: 1.8, head: 8 });
      s += circ(270, 192, 34, { fill: C.orangeL, c: C.orange, w: 2 });
      for (k = 0; k < 4; k++) { var a = (-90 + k * 22) * Math.PI / 180; s += line(270, 192, 270 + 30 * Math.cos(a), 192 + 30 * Math.sin(a), { c: k === 3 ? C.orange : C.grayM, w: k === 3 ? 3 : 1.4 }); }
      s += t(318, 180, '펄스 1개 = 정해진 각도', { size: 13, b: 1, c: C.orange, ans: true }) + t(318, 202, '되먹임 없음 — 싸다', { size: 13, c: C.ink }) + t(318, 222, '실제로 간 거리는 모름', { size: 13, c: C.sub });
      return F.svg(480, 240, s);
    });

  add('trip', ['배선용 차단기(MCCB)', '보호기 — 열동형 계전기와 EOCR'],
    '차단기·보호기의 동작 특성 — 과전류는 클수록 빨리 끊고(반한시, 열동 요소), 단락 같은 대전류는 바로 끊는다(순시, 전자 요소)',
    function () {
      var s = axes(56, 204, 404, 180, '', '차단까지 시간') + t(460, 240, '전류 → (클수록 오른쪽)', { size: 13, c: C.sub, a: 'e' });
      var p = [];
      for (var k = 0; k <= 30; k++) { var u = k / 30, x = 90 + 220 * u; p.push([x, 40 + 140 * (1 - 1 / (1 + 6 * u)) ]); }
      s += poly(p, { c: C.orange, w: 3 }) + line(310, p[30][1], 310, 190, { c: C.red, w: 3 }) + line(310, 190, 450, 190, { c: C.red, w: 3 });
      s += t(118, 72, '반한시 — 클수록 빨리', { size: 14, b: 1, c: C.orange }) + t(118, 92, '열동 요소(바이메탈)', { size: 13, c: C.sub });
      s += t(320, 150, '순시 — 바로 차단', { size: 14, b: 1, c: C.red }) + t(320, 170, '전자 요소', { size: 13, c: C.sub });
      s += T(180, 222, '과전류(과부하)', { size: 13, b: 1, c: C.orange }) + T(380, 222, '대전류(단락)', { size: 13, b: 1, c: C.red });
      return F.svg(480, 254, s);
    });

  add('inverter', ['전자 접촉기와 인버터', '속도 제어와 인버터 제어'],
    '인버터 — 교류를 정류해 직류로 만들고(평활로 고르게), 스위칭 소자로 원하는 주파수·전압의 교류를 다시 만들어 모터 속도를 바꾼다',
    function () {
      var st = [['정류', 'AC → DC'], ['평활', '콘덴서'], ['인버팅', 'IGBT·MOSFET']], s = '';
      s += T(40, 40, '교류 전원', { size: 13, b: 1 }) + poly(sinePts(12, 56, 76, 14, 2, 0), { c: C.blue, w: 2 });
      st.forEach(function (q, k) {
        var x = 84 + k * 110;
        s += arrow(x - 14, 76, x - 2, 76, { w: 1.6, head: 7 }) + box(x, 52, 92, 48, { fill: k === 2 ? C.orangeL : C.grayL, c: k === 2 ? C.orange : C.ink, r: 8 });
        s += T(x + 46, 70, q[0], { size: 15, b: 1, halo: false, c: k === 2 ? C.orange : C.ink }) + S(x + 46, 90, q[1], { halo: false, c: C.ink });
      });
      s += arrow(406, 76, 420, 76, { w: 1.6, head: 7 }) + circ(446, 76, 20, { fill: C.blueL, c: C.blue, w: 2, label: 'M', lc: C.blue });
      /* 파형 */
      var y = 150, pr = [];
      for (var k = 0; k <= 40; k++) { var u = k / 40; pr.push([98 + 64 * u, y - 16 * Math.abs(Math.sin(2 * Math.PI * u * 1.5))]); }
      s += poly(pr, { c: C.blue, w: 2 }) + line(208, y - 12, 272, y - 12, { c: C.blue, w: 2 });
      var pw = [], xx = 318;
      [4, 7, 9, 7, 4, 4, 7, 9, 7, 4].forEach(function (w, k) { var hi = k < 5; pw.push([xx, y], [xx, hi ? y - 16 : y + 16], [xx + w, hi ? y - 16 : y + 16], [xx + w, y]); xx += w + 2; });
      s += poly(pw, { c: C.grayM, w: 1.4 }) + poly(sinePts(318, 72, y, 16, 1, 0), { c: C.orange, w: 2.2 });
      s += S(130, 180, '울퉁불퉁한 직류') + S(240, 180, '고른 직류') + S(354, 180, '원하는 주파수');
      s += box(302, 200, 104, 30, { fill: '#fff', c: C.sub, r: 6, label: '제어 (MCU·DSP)', size: 12, lc: C.ink, dash: '4 3' }) + line(354, 200, 354, 190, { c: C.sub, w: 1.2, dash: '3 3' });
      s += t(12, 216, 'VVVF — 주파수와 전압을', { size: 13, b: 1, c: C.blue }) + t(12, 236, '함께 바꿔 속도를 맞춘다', { size: 13, b: 1, c: C.blue });
      return F.svg(480, 250, s);
    });

  add('startCur', ['직접 기동과 저전압 기동'],
    '기동 전류 — 직접 기동은 정격의 5~7배가 한꺼번에 흐르고, Y−Δ 기동은 그 약 1/3 로 줄인다(곡선 모양은 개념)',
    function () {
      var x0 = 50, y0 = 206, s = axes(x0, y0, 410, 180, '시간', '전류');
      var rated = y0 - 24;
      s += line(x0, rated, x0 + 400, rated, { c: C.sub, w: 1.2, dash: '5 4' }) + t(x0 + 404, rated - 10, '정격', { size: 13, c: C.sub, a: 'e' });
      var d = [[x0, y0], [x0 + 20, y0]];
      for (var k = 0; k <= 30; k++) { var u = k / 30; d.push([x0 + 22 + 150 * u, rated - 124 * Math.exp(-3.2 * u) + (u < 0.02 ? 0 : 0)]); }
      d.push([x0 + 400, rated]);
      s += poly(d, { c: C.red, w: 2.6 });
      var y = [[x0, y0], [x0 + 20, y0]];
      for (k = 0; k <= 20; k++) { u = k / 20; y.push([x0 + 22 + 110 * u, rated - 42 * Math.exp(-2.5 * u)]); }
      y.push([x0 + 150, rated - 6], [x0 + 154, rated - 30]);
      for (k = 0; k <= 10; k++) { u = k / 10; y.push([x0 + 154 + 60 * u, rated - 30 * Math.exp(-3 * u)]); }
      y.push([x0 + 400, rated]);
      s += poly(y, { c: C.blue, w: 2.4 });
      s += t(x0 + 44, 44, '직접 기동 — 정격의 5~7배', { size: 14, b: 1, c: C.red, ans: true });
      s += t(x0 + 150, 118, 'Y−Δ 기동 — 약 1/3', { size: 14, b: 1, c: C.blue }) + callout(x0 + 158, rated - 28, x0 + 214, 150, 'Δ 로 바꿀 때', { a: 's', size: 13 });
      return F.svg(480, 226, s);
    });

  /* ═══════════ CH13 공기압 제어 ═══════════ */

  add('pneuSys', ['공압의 개념과 장단점', '공압 장치의 구성과 공기 압축기', '공기 탱크와 공기 청정화 기기'],
    '공압 장치의 흐름 — 동력원 → 공기압 발생부 → 청정 정화부 → 제어부 → 작동부',
    function () {
      var r1 = [['전동기', 0], ['압축기', 1], ['애프터 쿨러', 1], ['공기 탱크', 1]], r2 = [['드라이어', 2], ['조정 유닛', 2], ['방향 제어 밸브', 3], ['실린더', 4]];
      var cc = [[C.sub, '#fff'], [C.blue, C.blueL], [C.green, C.greenL], [C.orange, C.orangeL], [C.sub, '#fff']], s = '';
      function row(r, y) {
        var o = '';
        r.forEach(function (q, k) {
          var x = 8 + k * 118;
          o += dev(x, y, 104, 40, q[0], cc[q[1]][0], cc[q[1]][1], { size: 13 });
          if (k < 3) o += arrow(x + 105, y + 20, x + 117, y + 20, { w: 1.6, head: 7 });
        });
        return o;
      }
      s += row(r1, 36) + row(r2, 150);
      s += route([[418, 76], [418, 110], [60, 110], [60, 148]], { w: 1.6, head: 8, c: C.sub });
      s += S(60, 24, '동력원', { b: 1 }) + poly([[124, 28], [124, 22], [472, 22], [472, 28]], { c: C.blue, w: 1.4 }) + T(298, 14, '공기압 발생부', { size: 13, b: 1, c: C.blue, halo: true });
      s += poly([[8, 198], [8, 204], [224, 204], [224, 198]], { c: C.green, w: 1.4 }) + T(116, 218, '청정 정화부', { size: 13, b: 1, c: C.green });
      s += S(296, 218, '제어부', { b: 1, c: C.orange }) + S(414, 218, '작동부', { b: 1 });
      s += S(177, 132, 'F·R·L (여과기 · 조정기 · 윤활기)', { c: C.green, b: 1 });
      s += S(240, 246, '애프터 쿨러 · 탱크가 식히며 물을 빼고, 드라이어가 남은 수분까지 뺀다', { c: C.ink });
      return F.svg(480, 262, s);
    });

  add('pressure', ['공기의 물리적 성질과 압력'],
    '압력의 기준 — 절대 압력은 완전 진공을 0 으로, 게이지 압력은 대기압을 0 으로 잰다. 절대 압력 = 대기압 + 게이지압',
    function () {
      var s = line(40, 206, 300, 206, { c: C.ink, w: 2 }) + t(306, 206, '완전 진공 (0)', { size: 14, b: 1 });
      s += line(40, 136, 300, 136, { c: C.blue, w: 2, dash: '8 5' }) + t(306, 136, '대기압', { size: 14, b: 1, c: C.blue });
      s += line(40, 50, 300, 50, { c: C.sub, w: 1.2, dash: '3 4' }) + dot(260, 50, 6, C.red) + t(306, 50, '잰 압력', { size: 14, b: 1, c: C.red });
      s += arrow(80, 206, 80, 54, { c: C.orange, w: 3, head: 10 }) + alt(90, 96, '절대 압력', '㉯', { size: 15, b: 1, c: C.orange });
      s += arrow(200, 136, 200, 54, { c: C.green, w: 3, head: 10 }) + alt(210, 92, '게이지 압력', '㉮', { size: 15, b: 1, c: C.green });
      s += arrow(150, 136, 150, 176, { c: C.purple, w: 2, head: 8 }) + t(160, 166, '진공 압력', { size: 13, b: 1, c: C.purple });
      s += box(24, 226, 432, 30, { fill: '#fff', c: C.ink, r: 8 }) + T(240, 241, '절대 압력 = 대기압 + 게이지압', { size: 15, b: 1, halo: false, ans: true });
      s += S(240, 272, '게이지가 1bar 면 절대 압력은 약 2bar · 1bar = 100kPa = 0.1MPa', { c: C.ink, ans: true });
      return F.svg(480, 288, s);
    });

  add('fluidLaws', ['유체 기초 법칙 네 가지'],
    '파스칼 — 갇힌 유체의 압력은 어디나 같아 넓은 피스톤이 큰 힘을 낸다. 연속 — 관이 좁아지면 유속이 빨라진다(Q = A·V 일정)',
    function () {
      var s = T(124, 20, '파스칼의 법칙', { b: 1, size: 15, ans: true }) + T(360, 20, '연속의 법칙', { b: 1, size: 15 });
      s += path('M24,70 V176 H224 V90 H144 V160 H64 V70', { fill: 'none', c: C.ink, w: 2 });
      s += box(26, 100, 36, 76, { fill: C.blueL, c: 'none', r: 0, w: 0 }) + box(62, 160, 84, 16, { fill: C.blueL, c: 'none', r: 0, w: 0 }) + box(146, 110, 76, 66, { fill: C.blueL, c: 'none', r: 0, w: 0 });
      s += box(26, 92, 36, 10, { fill: C.grayM, c: C.ink, r: 1 }) + box(146, 102, 76, 10, { fill: C.grayM, c: C.ink, r: 1 });
      s += arrow(44, 50, 44, 90, { c: C.red, w: 2.2, head: 9 }) + t(52, 56, 'F₁ 작은 힘', { size: 13, b: 1, c: C.red });
      s += arrow(184, 100, 184, 44, { c: C.red, w: 4.4, head: 13 }) + t(194, 50, 'F₂ 큰 힘', { size: 13, b: 1, c: C.red });
      s += T(124, 196, '압력 P 는 어디나 같다', { size: 13, b: 1, c: C.blue }) + T(124, 216, 'P = F ÷ A', { size: 13, c: C.ink });
      s += path('M256,74 H320 L360,94 H468', { c: C.ink, w: 2 }) + path('M256,146 H320 L360,126 H468', { c: C.ink, w: 2 });
      s += box(257, 76, 62, 68, { fill: C.blueL, c: 'none', r: 0, w: 0 }) + path('M320,76 L360,96 H466 V124 H360 L320,144 Z', { fill: C.blueL, c: 'none', w: 0 });
      s += arrow(268, 110, 300, 110, { c: C.green, w: 2.2, head: 9 }) + arrow(376, 110, 454, 110, { c: C.green, w: 2.2, head: 9 });
      s += T(288, 166, '넓다 → 느림', { size: 13, c: C.ink }) + T(414, 144, '좁다 → 빠름', { size: 13, c: C.ink });
      s += T(360, 196, 'Q = A₁V₁ = A₂V₂', { size: 15, b: 1, c: C.green });
      return F.svg(480, 230, s);
    });

  function gauge(x, y, ang, c) {
    var a = ang * Math.PI / 180;
    return circ(x, y, 13, { fill: '#fff', c: c || C.ink, w: 1.6 }) + line(x, y, x + 10 * Math.cos(a), y + 10 * Math.sin(a), { c: C.red, w: 2 }) + dot(x, y, 2.5, C.ink);
  }

  add('pValves', ['압력 제어 밸브'],
    '릴리프 밸브는 1차 쪽 압력이 설정값을 넘으면 열려 빼내 최고 압력을 막고, 감압 밸브(레귤레이터)는 2차(출구) 쪽 압력을 일정하게 지킨다',
    function () {
      var s = T(120, 20, '릴리프 밸브(안전밸브)', { b: 1, size: 15, c: C.red }) + T(362, 20, '감압 밸브(레귤레이터)', { b: 1, size: 15, c: C.blue });
      /* 릴리프 */
      var y = 160;
      s += dev(10, y - 16, 60, 32, '압축기', C.ink, C.grayL, { size: 13 }) + line(70, y, 168, y, { c: C.ink, w: 2 }) + dev(168, y - 16, 60, 32, '장치', C.ink, '#fff', { size: 13 });
      s += line(90, y, 90, y - 14, { c: C.ink, w: 1.4 }) + gauge(90, y - 27, -60);
      s += line(130, y, 130, 112, { c: C.ink, w: 2 }) + box(114, 72, 32, 40, { fill: '#fff', c: C.red, r: 0, w: 2 }) + arrow(138, 106, 138, 78, { c: C.red, w: 1.8, head: 7 });
      s += poly([[130, 72], [122, 66], [138, 60], [122, 54], [138, 48], [130, 42]], { c: C.ink, w: 1.6 }) + t(144, 46, '스프링(설정값)', { size: 12, c: C.sub });
      s += line(146, 82, 176, 82, { c: C.ink, w: 2 }) + tri(176, 82, false) + t(186, 96, '배기', { size: 12, c: C.sub });
      s += S(120, 200, '1차 쪽이 설정보다 높으면 열림', { c: C.ink, b: 1 }) + S(120, 220, '→ 최고 압력을 막는다', { c: C.red, b: 1 });
      s += line(240, 14, 240, 230, { c: C.edge, w: 1.4 });
      /* 감압 */
      s += dev(250, y - 16, 56, 32, '압축기', C.ink, C.grayL, { size: 13 }) + line(306, y, 346, y, { c: C.ink, w: 2 });
      s += box(346, y - 20, 36, 40, { fill: '#fff', c: C.blue, r: 0, w: 2 }) + arrow(350, y, 378, y, { c: C.blue, w: 1.8, head: 7 });
      s += poly([[364, y + 20], [356, y + 26], [372, y + 32], [356, y + 38], [372, y + 44], [364, y + 50]], { c: C.ink, w: 1.6 });
      s += line(382, y, 420, y, { c: C.ink, w: 2 }) + dev(420, y - 16, 52, 32, '장치', C.ink, '#fff', { size: 13 });
      s += line(326, y, 326, y - 14, { c: C.ink, w: 1.4 }) + gauge(326, y - 27, -40) + T(326, 104, '1차', { size: 13, b: 1, c: C.sub });
      s += line(402, y, 402, y - 14, { c: C.ink, w: 1.4 }) + gauge(402, y - 27, -100, C.blue) + T(402, 104, '2차', { size: 13, b: 1, c: C.blue });
      s += S(362, 220, '2차(출구) 쪽을 일정하게', { c: C.blue, b: 1 });
      return F.svg(480, 238, s);
    });

  /* 공압 기호 조각 */
  function tri(x, y, up, c) { c = c || C.ink; return up ? poly([[x - 8, y + 12], [x + 8, y + 12], [x, y]], { close: 1, c: c, w: 1.6 }) : poly([[x - 8, y], [x + 8, y], [x, y + 12]], { close: 1, c: c, w: 1.6 }); }
  function tBlock(x, yb, c) { c = c || C.ink; return line(x, yb, x, yb - 14, { c: c, w: 1.8 }) + line(x - 7, yb - 14, x + 7, yb - 14, { c: c, w: 1.8 }); }
  function tTop(x, yt, c) { c = c || C.ink; return line(x, yt, x, yt + 14, { c: c, w: 1.8 }) + line(x - 7, yt + 14, x + 7, yt + 14, { c: c, w: 1.8 }); }
  function spring(x, y) { var p = [[x, y]]; for (var k = 1; k <= 6; k++) p.push([x + k * 4, y + (k % 2 ? -8 : 8)]); p.push([x + 28, y]); return poly(p, { c: C.ink, w: 1.6 }); }
  function sol(x, y) { return box(x - 22, y - 10, 22, 20, { fill: '#fff', c: C.ink, r: 0, w: 1.6 }) + line(x - 22, y + 10, x, y - 10, { c: C.ink, w: 1.4 }); }
  function flowA(x1, y1, x2, y2) { return arrow(x1, y1, x2, y2, { c: C.blue, w: 1.8, head: 8 }); }
  function v32(x, y, lab) {       /* 3/2 NC 솔레노이드·스프링 복귀 — x,y 는 왼쪽 칸 왼쪽 위 */
    var w = 60, h = 50, xr = x + w, o = '';
    o += box(x, y, w, h, { fill: '#fff', c: C.ink, r: 0, w: 2 }) + box(xr, y, w, h, { fill: '#fff', c: C.ink, r: 0, w: 2 });
    o += flowA(x + 20, y + h - 4, x + 30, y + 6) + tBlock(x + 45, y + h);
    o += flowA(xr + 30, y + 6, xr + 45, y + h - 4) + tBlock(xr + 15, y + h);
    o += line(xr + 30, y, xr + 30, y - 18, { c: C.ink, w: 2 }) + line(xr + 15, y + h, xr + 15, y + h + 18, { c: C.ink, w: 2 }) + line(xr + 45, y + h, xr + 45, y + h + 18, { c: C.ink, w: 2 });
    o += tri(xr + 15, y + h + 18, true) + tri(xr + 45, y + h + 18, false);
    o += t(xr + 38, y - 16, lab[0], { size: 14, b: 1 }) + t(xr + 4, y + h + 26, lab[1], { size: 14, b: 1, a: 'e' }) + t(xr + 56, y + h + 26, lab[2], { size: 14, b: 1 });
    return o + sol(x, y + 25) + spring(xr + w, y + 25);
  }

  add('dirValve', ['방향 제어 밸브', '공기압 기호 읽는 법 (KS B 0054)'],
    '방향 제어 밸브 기호 — 네모 칸 수 = 위치 수, 한 칸에 붙은 선 수 = 포트 수. 기호는 스프링에 밀려 있는 초기 상태로 그린다',
    function () {
      var s = T(100, 20, '3/2 밸브', { b: 1, size: 16, c: C.blue }) + S(100, 40, '포트 3 · 위치 2');
      s += v32(40, 76, ['2', '1', '3']);
      /* 5/2 */
      var x = 262, y = 76, w = 80, h = 50, xr = x + w;
      s += T(360, 20, '5/2 밸브', { b: 1, size: 16, c: C.blue }) + S(360, 40, '포트 5 · 위치 2');
      s += box(x, y, w, h, { fill: '#fff', c: C.ink, r: 0, w: 2 }) + box(xr, y, w, h, { fill: '#fff', c: C.ink, r: 0, w: 2 });
      s += flowA(x + 40, y + h - 4, x + 20, y + 6) + flowA(x + 60, y + 6, x + 70, y + h - 4) + tBlock(x + 10, y + h);
      s += flowA(xr + 40, y + h - 4, xr + 60, y + 6) + flowA(xr + 20, y + 6, xr + 10, y + h - 4) + tBlock(xr + 70, y + h);
      [[xr + 20, '4'], [xr + 60, '2']].forEach(function (p) { s += line(p[0], y, p[0], y - 18, { c: C.ink, w: 2 }) + t(p[0] + 6, y - 14, p[1], { size: 14, b: 1 }); });
      [[xr + 10, '5', 0], [xr + 40, '1', 1], [xr + 70, '3', 0]].forEach(function (p) { s += line(p[0], y + h, p[0], y + h + 18, { c: C.ink, w: 2 }) + tri(p[0], y + h + 18, !!p[2]) + t(p[0], y + h + 42, p[1], { size: 14, b: 1, a: 'm' }); });
      s += sol(x, y + 25) + spring(xr + w, y + 25);
      s += callout(70, 90, 60, 176, '칸 1개 = 위치 1개', { a: 'm', size: 13, c: C.orange, tc: C.orange, b: 1 });
      s += callout(385, 146, 470, 196, '선 = 포트', { a: 'e', size: 13, c: C.orange, tc: C.orange, b: 1 });
      s += line(12, 214, 468, 214, { c: C.edge, w: 1.4 });
      s += tri(24, 226, true) + t(38, 234, '공급', { size: 13 }) + tri(94, 228, false) + t(108, 234, '배기', { size: 13 }) + tBlock(164, 242) + t(176, 234, '막힘', { size: 13 });
      s += spring(214, 234) + t(248, 234, '스프링', { size: 13 }) + sol(322, 234) + t(328, 234, '솔레노이드', { size: 13 });
      s += line(24, 268, 64, 268, { c: C.ink, w: 1.8 }) + line(44, 254, 44, 282, { c: C.ink, w: 1.8 }) + dot(44, 268, 4.5) + t(72, 268, '점 있으면 연결', { size: 13 });
      s += line(196, 268, 236, 268, { c: C.ink, w: 1.8 }) + line(216, 254, 216, 282, { c: C.ink, w: 1.8 }) + t(244, 268, '점 없으면 안 이어짐', { size: 13 });
      return F.svg(480, 292, s);
    });

  add('valve32', [],
    '3/2 방향 제어 밸브 기호 하나 — 칸과 선을 세어 읽는다',
    function () {
      return F.svg(480, 190, v32(170, 64, ['A', 'P', 'R']));
    });

  function cyl(x, y, w, h, px, rodTo) {    /* 복동 실린더 — px: 피스톤 위치 */
    var o = box(x, y, w, h, { fill: C.blueL, c: C.ink, r: 2, w: 2 });
    o += box(x - 10, y - 4, 10, h + 8, { fill: C.grayM, c: C.ink, r: 1, w: 1.4 }) + box(x + w, y - 4, 10, h + 8, { fill: C.grayM, c: C.ink, r: 1, w: 1.4 });
    o += box(px, y + 2, 14, h - 4, { fill: C.grayM, c: C.ink, r: 1, w: 1.6 }) + box(px + 14, y + h / 2 - 5, rodTo - px - 14, 10, { fill: '#fff', c: C.ink, r: 1, w: 1.6 });
    return o;
  }
  function throttle(x, y, c) { c = c || C.ink; return path('M' + (x - 14) + ',' + (y - 9) + ' Q' + x + ',' + (y + 1) + ' ' + (x + 14) + ',' + (y - 9), { c: c, w: 1.8 }) + path('M' + (x - 14) + ',' + (y + 9) + ' Q' + x + ',' + (y - 1) + ' ' + (x + 14) + ',' + (y + 9), { c: c, w: 1.8 }); }
  function check(x, y, c) { c = c || C.ink; return circ(x, y, 6, { fill: '#fff', c: c, w: 1.6 }) + poly([[x + 12, y - 9], [x + 5, y], [x + 12, y + 9]], { c: c, w: 1.8 }); }

  add('cylinder', ['유량 제어 밸브와 액추에이터'],
    '복동 공압 실린더의 구조, 그리고 속도 제어 밸브(교축 밸브 + 체크 밸브 병렬) — 한쪽은 조여 천천히, 반대쪽은 체크로 빠르게',
    function () {
      var s = cyl(70, 50, 280, 70, 170, 450);
      s += line(84, 46, 84, 26, { c: C.ink, w: 2 }) + line(338, 46, 338, 26, { c: C.ink, w: 2 });
      s += callout(140, 60, 156, 20, '튜브', { a: 's', size: 13 }) + callout(177, 110, 160, 150, '피스톤', { a: 'e', size: 13 }) + callout(400, 85, 410, 150, '피스톤 로드', { a: 'm', size: 13 });
      s += callout(64, 110, 28, 150, '헤드 커버', { a: 'm', size: 13 }) + callout(356, 116, 320, 150, '로드 커버', { a: 'm', size: 13 }) + t(90, 22, '포트', { size: 13, b: 1, c: C.blue }) + t(346, 22, '포트', { size: 13, b: 1, c: C.blue });
      /* 속도 제어 밸브 */
      var y = 212;
      s += T(240, 176, '속도 제어 밸브', { b: 1, size: 15 });
      s += line(90, y, 390, y, { c: C.ink, w: 2 }) + throttle(240, y, C.orange);
      s += line(150, y, 150, y + 34, { c: C.ink, w: 2 }) + line(330, y, 330, y + 34, { c: C.ink, w: 2 }) + line(150, y + 34, 330, y + 34, { c: C.ink, w: 2 }) + check(240, y + 34, C.green);
      s += arrow(100, y - 12, 150, y - 12, { c: C.orange, w: 1.6, head: 7 }) + t(252, y - 20, '교축 — 조여서 천천히', { size: 13, b: 1, c: C.orange, a: 's' });
      s += arrow(380, y + 50, 330, y + 50, { c: C.green, w: 1.6, head: 7 }) + t(240, y + 58, '체크 — 반대로는 빠르게', { size: 13, b: 1, c: C.green, a: 'm' });
      return F.svg(480, 284, s);
    });

  add('meter', ['미터 인 · 미터 아웃 · 자기 유지 회로'],
    '미터 인은 실린더로 들어가는 공기를, 미터 아웃은 실린더에서 나오는 공기를 조여 속도를 맞춘다(전진할 때의 예)',
    function () {
      var s = '';
      [['미터 인', 0, C.green, '들어가는 공기를 조임'], ['미터 아웃', 1, C.orange, '나오는 공기를 조임']].forEach(function (q, i) {
        var y = 30 + i * 118;
        s += t(12, y, q[0], { b: 1, size: 16, c: q[2] }) + t(12, y + 22, q[3], { size: 13, b: 1, c: q[2], ans: true });
        s += cyl(250, y + 10, 150, 44, 290, 460);
        s += line(262, y + 54, 262, y + 80, { c: C.ink, w: 2 }) + line(388, y + 54, 388, y + 80, { c: C.ink, w: 2 });
        if (i === 0) {
          s += line(160, y + 80, 262, y + 80, { c: C.ink, w: 2 }) + throttle(206, y + 80, C.green) + arrow(170, y + 70, 244, y + 70, { c: C.green, w: 2, head: 8 });
          s += line(388, y + 80, 440, y + 80, { c: C.ink, w: 2 }) + arrow(400, y + 92, 440, y + 92, { c: C.sub, w: 1.6, head: 7 }) + t(444, y + 92, '배기', { size: 12, c: C.sub });
          s += t(150, y + 80, '공급', { size: 13, c: C.sub, a: 'e' });
        } else {
          s += line(160, y + 80, 262, y + 80, { c: C.ink, w: 2 }) + arrow(170, y + 70, 244, y + 70, { c: C.sub, w: 1.6, head: 7 }) + t(150, y + 80, '공급', { size: 13, c: C.sub, a: 'e' });
          s += line(388, y + 80, 468, y + 80, { c: C.ink, w: 2 }) + throttle(428, y + 80, C.orange) + arrow(400, y + 94, 460, y + 94, { c: C.orange, w: 2, head: 8 });
        }
      });
      return F.svg(480, 262, s);
    });

  add('stepDia', ['시험 운전과 기기 관리'],
    '변위단계선도 — 실린더 A·B 가 A+ → B+ → B− → A− 순서로 움직이는 한 사이클(1 = 전진, 0 = 후진)',
    function () {
      var xs = [100, 180, 260, 340, 420], s = '';
      xs.forEach(function (x, k) { s += line(x, 30, x, 200, { c: C.grayM, w: 1, dash: '3 4' }) + T(x, 20, String(k + 1), { size: 14, b: 1, c: C.sub }); });
      function lane(y, name, pts, c) {
        var o = t(16, y - 20, name, { b: 1, size: 16, c: c }) + t(76, y - 40, '1', { size: 13, c: C.sub, a: 'e' }) + t(76, y, '0', { size: 13, c: C.sub, a: 'e' });
        o += line(100, y, 420, y, { c: C.edge, w: 1 }) + line(100, y - 40, 420, y - 40, { c: C.edge, w: 1 });
        return o + poly(pts, { c: c, w: 3 });
      }
      s += lane(90, 'A', [[100, 90], [180, 50], [340, 50], [420, 90]], C.blue);
      s += lane(180, 'B', [[100, 180], [180, 180], [260, 140], [340, 180], [420, 180]], C.orange);
      s += T(140, 40, 'A+', { size: 14, b: 1, c: C.blue }) + T(220, 128, 'B+', { size: 14, b: 1, c: C.orange }) + T(300, 128, 'B−', { size: 14, b: 1, c: C.orange }) + T(380, 40, 'A−', { size: 14, b: 1, c: C.blue });
      s += S(240, 222, '단일 사이클 운전 — 이 1주기가 논리대로 도는지 본다', { c: C.ink });
      return F.svg(480, 238, s);
    });

  /*@@MORE@@*/
  return R;
})();
})();
/* ── 복사본: 공유압 마스터/figs.js ── */
FIGS_SRC.P = (function () {
/* ══════════════════════════════════════════════════════════════
   공유압 마스터 — 그림 모음 (그림09 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. 이 파일은 index.html(배우기) · lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['learn.js 카드 제목'…], draw:function(){ … } }
       cards — 이 그림이 실제로 보여 주는 배우기 카드. learn.js 카드 본문의 P('키') 자리에 들어간다
     순서 = 배우기 화면에 나오는 순서.

   그림 내용의 근거
     · learn.js 카드 본문 · lesson.js 슬라이드 본문 — 수치는 카드에 있는 보기 수치만 썼다
     · symbols.js (KS B 0054 / ISO 1219-1) — 밸브 칸·포트 번호·조작 기호의 도시 규칙
     · 훈련교재 「공유압」 OCR (_작업/훈련교재-OCR) — 탠덤 센터(4장) · 미터 인/아웃 · 블리드 오프 · 무부하 회로(5장)
   교과서·교재의 그림을 따라 그리지 않았다. 같은 개념을 이 규격으로 새로 짰다.
   ══════════════════════════════════════════════════════════════ */
return (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, callout = F.callout;

  /* ── 공유압 기호 도우미 (기호 선은 1.8) ───────────────── */
  var SW = 1.8;
  function sq(x, y, s, o) { o = o || {}; return box(x, y, s, s, { fill: o.fill || C.paper, r: 0, w: SW, c: o.c }); }
  function ia(x1, y1, x2, y2, c) { return arrow(x1, y1, x2, y2, { w: 1.6, head: 8, c: c || C.ink }); }
  /* 막힌 포트 — (x,y) 에서 dir(+1 아래 · -1 위) 쪽으로 짧게 긋고 가로 막대 */
  function tee(x, y, dir, c) {
    var y1 = y + 9 * dir;
    return line(x, y, x, y1, { w: SW, c: c }) + line(x - 6, y1, x + 6, y1, { w: SW, c: c });
  }
  /* 스프링 — (x,y) 에서 dir 쪽으로 len 만큼 지그재그 */
  function spr(x, y, len, dir, c, amp) {
    var n = 6, p = [[x, y]], a = amp || 7;
    for (var i = 1; i < n; i++) p.push([x + dir * len * i / n, y + (i % 2 ? -a : a)]);
    p.push([x + dir * len, y]);
    return F.poly(p, { w: 1.5, c: c || C.ink });
  }
  /* 세로 스프링 — (x,y) 에서 아래(dir=1)로 */
  function sprV(x, y, len, dir, c) {
    var n = 6, p = [[x, y]];
    for (var i = 1; i < n; i++) p.push([x + (i % 2 ? -7 : 7), y + dir * len * i / n]);
    p.push([x, y + dir * len]);
    return F.poly(p, { w: 1.5, c: c || C.ink });
  }
  function push(x, y, dir) {                     /* 누름버튼 — 칸의 옆변 (x,y) 에서 바깥(dir) 쪽 */
    return line(x, y, x + dir * 10, y, { w: SW }) + box(dir > 0 ? x + 10 : x - 18, y - 7, 8, 14, { fill: C.paper, r: 1, w: SW });
  }
  function sol(x, y, dir, c) {                   /* 솔레노이드 */
    var bx = dir > 0 ? x + 6 : x - 24;
    return line(x, y, x + dir * 6, y, { w: SW, c: c }) + box(bx, y - 9, 18, 18, { fill: C.paper, r: 1, w: SW, c: c }) +
      line(bx + 2, y + 7, bx + 16, y - 7, { w: 1.4, c: c });
  }
  function pilotOp(x, y, dir, c) {               /* 공기압 파일럿 조작 */
    var x2 = x + dir * 12;
    return line(x, y, x2, y, { w: 1.4, dash: '4 3', c: c }) +
      F.poly([[x2 + dir * 12, y - 7], [x2 + dir * 12, y + 7], [x2, y]], { close: 1, fill: C.paper, w: 1.4, c: c });
  }
  function pumpSym(cx, cy, r, filled, o) {       /* 펌프 · 압력원 — 삼각형이 위(내보내는 쪽) */
    o = o || {};
    var tr = r * 0.5;
    return F.circle(cx, cy, r, { fill: C.paper, w: SW }) +
      F.poly([[cx, cy - r + 2], [cx + tr, cy - r + 2 + tr * 1.5], [cx - tr, cy - r + 2 + tr * 1.5]],
        { close: 1, fill: filled ? C.ink : C.paper, w: 1.4 });
  }
  function motorM(cx, cy) { return F.circle(cx, cy, 13, { fill: C.paper, w: SW }) + t(cx, cy + 1, 'M', { a: 'm', size: 14, b: 1, halo: false }); }
  function tank(x, y, w) {                       /* 기름 탱크 — 위가 열린 네모 */
    return F.path('M' + x + ',' + y + ' V' + (y + 14) + ' H' + (x + w) + ' V' + y, { w: SW });
  }
  function gauge(cx, cy, r) {
    return F.circle(cx, cy, r, { fill: C.paper, w: SW }) + ia(cx - r * 0.6, cy + r * 0.6, cx + r * 0.62, cy - r * 0.62);
  }
  function exh(x, y, c) {                        /* 배기구 — 아래를 향한 빈 삼각형 */
    return F.poly([[x - 8, y], [x + 8, y], [x, y + 11]], { close: 1, fill: C.paper, w: 1.4, c: c });
  }
  /* 교축 — 세로 관로 (x) 의 y 자리에 마주 보는 두 곡선 */
  function thrV(x, y, c) {
    return F.path('M' + (x - 13) + ',' + (y - 13) + ' Q' + (x - 2) + ',' + y + ' ' + (x - 13) + ',' + (y + 13), { w: 1.6, c: c }) +
      F.path('M' + (x + 13) + ',' + (y - 13) + ' Q' + (x + 2) + ',' + y + ' ' + (x + 13) + ',' + (y + 13), { w: 1.6, c: c });
  }
  function thrH(x, y, c) {
    return F.path('M' + (x - 13) + ',' + (y - 13) + ' Q' + x + ',' + (y - 2) + ' ' + (x + 13) + ',' + (y - 13), { w: 1.6, c: c }) +
      F.path('M' + (x - 13) + ',' + (y + 13) + ' Q' + x + ',' + (y + 2) + ' ' + (x + 13) + ',' + (y + 13), { w: 1.6, c: c });
  }
  /* 체크 밸브 — 볼 + V 시트. seat: 시트가 볼의 어느 쪽에 있는지('r' 이면 오른쪽 → 왼쪽에서 오른쪽 흐름을 막는다) */
  function checkH(cx, cy, seat, c) {
    var s = seat === 'r' ? 1 : -1;
    return F.circle(cx, cy, 6, { fill: C.paper, w: 1.5, c: c }) +
      F.poly([[cx + s * 1, cy - 11], [cx + s * 9, cy], [cx + s * 1, cy + 11]], { w: 1.5, c: c });
  }
  function checkV(cx, cy, seat, c) {             /* seat 'u' = 시트가 위 → 아래에서 위 흐름을 막는다 */
    var s = seat === 'u' ? -1 : 1;
    return F.circle(cx, cy, 6, { fill: C.paper, w: 1.5, c: c }) +
      F.poly([[cx - 11, cy + s * 1], [cx, cy + s * 9], [cx + 11, cy + s * 1]], { w: 1.5, c: c });
  }
  /* 일방향 유량 조절 밸브(세로 관로용) — 점선 네모 안에 교축과 체크를 나란히.
     freeUp: 체크가 아래→위 흐름을 그대로 통과시키면 true */
  function fcV(x, y, freeUp, c) {
    var s = line(x, y - 30, x, y + 30, { w: SW }) + thrV(x, y, c) +
      F.path('M' + x + ',' + (y - 22) + ' H' + (x + 24) + ' V' + (y + 22) + ' H' + x, { w: 1.4 }) +
      checkV(x + 24, y, freeUp ? 'd' : 'u') +
      box(x - 20, y - 26, 58, 52, { fill: 'none', r: 3, w: 1.2, c: C.sub, dash: '5 4' });
    return s;
  }
  /* 가로 실린더(단면이 아닌 기호형) — 몸통 · 피스톤 · 로드 */
  function cylSym(x, y, w, h, px, rodEnd, o) {
    o = o || {};
    return box(x, y, w, h, { fill: o.fill || C.paper, r: 2, w: 2 }) +
      box(px, y, 8, h, { fill: C.ink, r: 0, w: 1 }) +
      line(px + 8, y + h / 2, rodEnd, y + h / 2, { w: 4 });
  }
  /* 단면 실린더 — 벽 두께를 보인다 */
  function cylCut(x, y, w, h, px, rodEnd, o) {
    o = o || {};
    var s = box(x, y, w, h, { fill: C.grayM, r: 3, w: 2 }) +
      box(x + 6, y + 6, w - 12, h - 12, { fill: C.paper, r: 1, w: 1 });
    if (o.leftFill) s += box(x + 6, y + 6, px - x - 6, h - 12, { fill: o.leftFill, r: 0, w: 0, c: 'none' });
    if (o.rightFill) s += box(px + 12, y + 6, x + w - 6 - px - 12, h - 12, { fill: o.rightFill, r: 0, w: 0, c: 'none' });
    s += box(px, y + 6, 12, h - 12, { fill: C.sub, r: 1, w: 1.2 }) +
      box(px + 12, y + h / 2 - 6, rodEnd - px - 12, 12, { fill: C.grayM, r: 1, w: 1.4 });
    return s;
  }
  function note(x, y, s, o) { o = o || {}; return t(x, y, s, { a: o.a || 'm', size: o.size || 13, c: o.c || C.sub, b: o.b }); }
  function head(x, y, s, o) { o = o || {}; return t(x, y, s, { a: o.a || 'm', size: 17, b: 1, c: o.c || C.ink }); }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  function hdiv(y, x1, x2) { return line(x1 || 16, y, x2 || 464, y, { c: C.grayM, w: 1.4, dash: '6 5' }); }

  /* 3/2 밸브 한 벌 — 칸 크기 s, 왼칸 x..x+s(눌렀을 때) · 오른칸 x+s..x+2s(평소, 스프링 쪽).
     nc=true : 평소 1 막힘 · 2→3 / 눌렀을 때 1→2 · 3 막힘 (symbols.js v32nc 와 같다)
     nc=false: 평소 1→2 · 3 막힘 / 눌렀을 때 1 막힘 · 2→3 (v32no) */
  function v32(x, y, s, nc, o) {
    o = o || {};
    var L = x, R = x + s, bl = s * 0.25, tm = s * 0.5, br = s * 0.75, bot = y + s, g = '';
    g += sq(L, y, s) + sq(R, y, s, { c: o.hiC, fill: o.hiFill });
    if (nc) {
      g += ia(L + bl, bot - 3, L + tm, y + 3) + tee(L + br, bot, -1);
      g += ia(R + tm, y + 3, R + br, bot - 3) + tee(R + bl, bot, -1);
    } else {
      g += tee(L + bl, bot, -1) + ia(L + tm, y + 3, L + br, bot - 3);
      g += ia(R + bl, bot - 3, R + tm, y + 3, o.flowC) + tee(R + br, bot, -1);
    }
    g += push(L, y + s / 2, -1) + spr(R + s, y + s / 2, 22, 1);
    return g;
  }

  return {

  /* ─────────── 1. 공압 장치의 구성 ─────────── */
  airpath: { cards: ['공기가 지나가는 길'],
    cap: '압축공기가 지나가는 여덟 자리 — 만들고 · 다듬은 뒤 · 보내고 · 조여서 · 일을 시킨다',
    draw: function () {
      var s = '', X = [12, 128, 244, 360], W = 104, H = 58;
      var r1 = [['공기압축기', '만든다'], ['애프터쿨러', '식힌다'], ['공기탱크', '모은다'], ['에어드라이어', '말린다']];
      var r2 = [['조정 유닛', '다듬는다'], ['방향제어밸브', '보낸다'], ['속도제어밸브', '조인다'], ['실린더', '일한다']];
      for (var i = 0; i < 4; i++) {
        s += box(X[i], 36, W, H, { fill: C.blueL, c: C.blue }) + F.num(X[i] + 4, 36, i + 1, { c: C.blue, r: 11, size: 13 }) +
          t(X[i] + W / 2, 58, r1[i][0], { a: 'm', b: 1, size: 15, halo: false }) +
          t(X[i] + W / 2, 80, r1[i][1], { a: 'm', size: 13, c: C.sub, halo: false });
        if (i < 3) s += arrow(X[i] + W + 1, 65, X[i + 1] - 2, 65, { w: 1.8, head: 9 });
      }
      s += arrow(412, 95, 412, 134, { w: 1.8, head: 9 });
      for (var j = 0; j < 4; j++) {
        var x = X[3 - j];
        var fill = j === 0 ? C.blueL : C.greenL, c = j === 0 ? C.blue : C.green;
        s += box(x, 136, W, H, { fill: fill, c: c }) + F.num(x + 4, 136, j + 5, { c: c, r: 11, size: 13 }) +
          t(x + W / 2, 158, r2[j][0], { a: 'm', b: 1, size: 15, halo: false }) +
          t(x + W / 2, 180, r2[j][1], { a: 'm', size: 13, c: C.sub, halo: false });
        if (j < 3) s += arrow(x - 1, 165, X[3 - j - 1] + W + 2, 165, { w: 1.8, head: 9 });
      }
      s += note(240, 218, '조정 유닛 = 공기압 조정 유닛 (필터 + 감압 밸브 + 윤활기)');
      return F.svg(480, 236, s);
    } },

  frl: { cards: ['공기압 조정 유닛 — 세 가지가 한 덩어리'],
    cap: '공기압 조정 유닛 — 필터 → 감압 밸브 → 윤활기, 이 순서라야 뒤 기기가 상하지 않는다',
    draw: function () {
      var s = '', X = [62, 190, 318], W = 104;
      var nm = ['필터', '감압 밸브', '윤활기'], sub = ['먼지·물을\n거른다', '압력을 낮춰\n일정하게', '기름 안개를\n섞는다'];
      s += arrow(8, 112, 60, 112, { c: C.blue, w: 2.4 }) + t(6, 140, '압축공기', { b: 1, c: C.blue, size: 13 });
      s += arrow(424, 112, 472, 112, { c: C.blue, w: 2.4 }) + t(474, 140, '장치로', { a: 'e', b: 1, c: C.blue, size: 13 });
      for (var i = 0; i < 3; i++) {
        s += box(X[i], 88, W, 48, { fill: C.grayL }) + F.num(X[i] + 4, 88, i + 1, { c: C.blue, r: 11, size: 13 }) +
          t(X[i] + W / 2, 112, nm[i], { a: 'm', b: 1, halo: false }) + t(X[i] + W / 2, 170, sub[i], { a: 'm', size: 14, c: C.sub });
        if (i < 2) s += arrow(X[i] + W + 1, 112, X[i + 1] - 2, 112, { w: 1.8, head: 9 });
      }
      /* 감압 밸브 위 압력계 */
      s += line(240, 88, 240, 66, { w: 1.6 }) + gauge(240, 48, 17);
      s += callout(258, 44, 296, 34, '압력계', { b: 1 });
      s += t(240, 214, '순서를 바꾸지 않는다', { a: 'm', b: 1, c: C.orange, size: 15 });
      return F.svg(480, 234, s);
    } },

  /* ─────────── 2. 공압과 유압의 차이 ─────────── */
  tri: { cards: ['기호에서 먼저 갈린다 — 삼각형 속'],
    cap: '동그라미는 같고 삼각형 속만 다르다 — 채워진 ▲ = 액체(유압), 빈 △ = 기체(공기압)',
    draw: function () {
      var s = divider(240, 20, 212);
      function src(cx, filled, c) {
        return line(cx, 44, cx, 70, { w: 2.2 }) + F.circle(cx, 112, 42, { fill: C.paper, w: 2.2 }) +
          F.poly([[cx, 74], [cx + 22, 108], [cx - 22, 108]], { close: 1, fill: filled ? C.ink : C.paper, w: 2, c: c });
      }
      s += src(120, true) + src(360, false);
      s += callout(136, 96, 196, 66, '속이 찼다', { c: C.orange, tc: C.orange, b: 1 });
      s += callout(376, 96, 420, 60, '속이 비었다', { c: C.orange, tc: C.orange, b: 1, a: 'm' });
      s += t(120, 180, '유압원', { a: 'm', b: 1, size: 17 }) + note(120, 204, '액체(기름)');
      s += t(360, 180, '공기압원', { a: 'm', b: 1, size: 17 }) + note(360, 204, '기체(공기)');
      return F.svg(480, 226, s);
    } },

  'return': { cards: ['무엇이 다른가'],
    cap: '돌아오는 배관 — 공압은 쓴 공기를 대기로 버리고, 유압은 기름을 반드시 탱크로 되돌린다',
    draw: function () {
      var s = divider(240, 16, 262);
      function panel(ox, hyd) {
        var g = head(ox + 112, 26, hyd ? '유압' : '공압', { c: hyd ? C.orange : C.blue });
        var sup = C.blue, ret = hyd ? C.orange : C.sub;
        /* 실린더 */
        g += cylSym(ox + 36, 48, 150, 34, ox + 92, ox + 214);
        /* 밸브 (두 칸) */
        g += sq(ox + 70, 124, 42) + sq(ox + 112, 124, 42);
        g += ia(ox + 80, 163, ox + 80, 128) + ia(ox + 102, 128, ox + 102, 163);
        g += ia(ox + 123, 163, ox + 144, 128) + ia(ox + 144 - 1, 163, ox + 123, 128);
        /* 실린더 ↔ 밸브 */
        g += F.poly([[ox + 80, 124], [ox + 80, 100], [ox + 50, 100], [ox + 50, 82]], { w: 2, c: sup });
        g += F.poly([[ox + 102, 124], [ox + 102, 108], [ox + 172, 108], [ox + 172, 82]], { w: 2, c: ret });
        /* 공급 */
        g += line(ox + 80, 166, ox + 80, 196, { w: 2, c: sup }) + pumpSym(ox + 80, 214, 16, hyd);
        g += note(ox + 42, 214, hyd ? '펌프' : '압축기', { a: 'e' });
        if (hyd) {
          g += line(ox + 80, 230, ox + 80, 238, { w: 2 }) + tank(ox + 60, 236, 100);
          g += F.poly([[ox + 102, 166], [ox + 102, 180], [ox + 140, 180], [ox + 140, 236]], { w: 2.4, c: ret });
          g += arrow(ox + 140, 196, ox + 140, 226, { c: ret, w: 2.4 });
          g += t(ox + 150, 206, '탱크로', { b: 1, c: ret, size: 15 });
          g += note(ox + 110, 262, '되돌리는 배관이 꼭 있다', { c: ret, b: 1 });
        } else {
          g += line(ox + 102, 166, ox + 102, 184, { w: 2, c: ret }) + exh(ox + 102, 184);
          g += F.path('M' + (ox + 118) + ',' + 200 + ' q8,-6 16,0 t16,0', { c: ret, w: 1.6 }) +
            F.path('M' + (ox + 118) + ',' + 212 + ' q8,-6 16,0 t16,0', { c: ret, w: 1.6 });
          g += t(ox + 156, 206, '대기로', { b: 1, c: ret, size: 15 });
          g += note(ox + 110, 262, '되돌리는 배관이 없다', { c: ret, b: 1 });
        }
        return g;
      }
      s += panel(8, false) + panel(248, true);
      return F.svg(480, 280, s);
    } },

  pascal: { cards: ['파스칼의 원리 — 유압이 힘을 키우는 이유'],
    cap: '파스칼의 원리 — 압력 p 는 어디서나 같으니, 면적이 4배인 쪽에서 힘도 4배가 된다',
    draw: function () {
      var s = '', lq = C.blueL;
      /* 그릇: 좁은 기둥(폭 50) · 넓은 기둥(폭 100 → 면적 4배) · 아래 통로 */
      s += F.path('M70,96 V200 H390 V96', { fill: 'none', w: 0 });
      s += box(70, 110, 50, 100, { fill: lq, r: 0, w: 0, c: 'none' }) + box(120, 176, 170, 34, { fill: lq, r: 0, w: 0, c: 'none' }) +
        box(290, 110, 100, 100, { fill: lq, r: 0, w: 0, c: 'none' });
      s += F.path('M70,60 V210 H390 V60 M120,60 V176 H290 V60', { w: 2.4 });
      /* 피스톤 */
      s += box(72, 98, 46, 12, { fill: C.sub, r: 1, w: 1.2 }) + box(292, 98, 96, 12, { fill: C.sub, r: 1, w: 1.2 });
      s += arrow(95, 40, 95, 94, { c: C.red, w: 2.4 }) + t(110, 42, 'F₁ 작은 힘', { b: 1, c: C.red });
      s += arrow(340, 96, 340, 24, { c: C.red, w: 5, head: 16 }) + t(356, 36, 'F₂ 큰 힘', { b: 1, c: C.red });
      s += t(95, 132, 'A₁', { a: 'm', b: 1 }) + t(340, 134, 'A₂ = 4 × A₁', { a: 'm', b: 1 });
      /* 압력은 사방으로 같게 */
      var P = [[205, 193, 205, 181], [180, 193, 168, 193], [230, 193, 242, 193]];
      for (var i = 0; i < P.length; i++) s += ia(P[i][0], P[i][1], P[i][2], P[i][3], C.blue);
      s += t(205, 232, '압력 p 가 어디서나 같다', { a: 'm', b: 1, c: C.blue, size: 15 });
      s += note(240, 256, 'p = F ÷ A → 힘 4배 · 대신 움직이는 거리는 1/4');
      return F.svg(480, 274, s);
    } },

  boyle: { cards: ['보일의 법칙 — 공기는 눌린다'],
    cap: '보일의 법칙 — 1기압 10 L 의 공기를 5기압으로 누르면 2 L 가 된다 (p₁V₁ = p₂V₂)',
    draw: function () {
      var s = '';
      function jar(x, top, pLbl, vLbl) {
        var g = box(x, 40, 90, 170, { fill: C.grayL, r: 3, w: 2 });
        g += box(x + 3, top + 12, 84, 207 - top - 12, { fill: C.blueL, r: 0, w: 0, c: 'none' });
        g += box(x + 3, top, 84, 12, { fill: C.sub, r: 1, w: 1.2 }) + line(x + 45, top, x + 45, 22, { w: 5, c: C.sub });
        /* 공기 알갱이 — 부피가 줄면 촘촘해진다 */
        var n = 14, h = 207 - top - 12;
        for (var i = 0; i < n; i++) {
          var px = x + 12 + (i * 29) % 66, py = top + 18 + ((i * 37) % Math.max(8, h - 12));
          g += '<circle cx="' + px + '" cy="' + py + '" r="3" fill="' + C.blue + '"/>';
        }
        g += t(x + 45, 232, vLbl, { a: 'm', b: 1, size: 17 }) + t(x + 45, 256, pLbl, { a: 'm', c: C.sub, size: 15 });
        return g;
      }
      s += jar(60, 60, '1기압', '10 L');
      s += jar(300, 162, '5기압', '2 L');
      s += arrow(345, 110, 345, 150, { c: C.red, w: 3, head: 13 }) + t(360, 124, '누른다', { b: 1, c: C.red });
      s += arrow(176, 128, 280, 128, { w: 2 }) + note(228, 110, '온도는 그대로');
      s += t(240, 286, '1 × 10 = 5 × 2', { a: 'm', b: 1, size: 17, c: C.blue });
      return F.svg(480, 304, s);
    } },

  conti: { cards: ['연속의 법칙 — 좁아지면 빨라진다'],
    cap: '연속의 법칙 — 단면적이 4배로 넓어지면 속도는 1/4 (A₁v₁ = A₂v₂)',
    draw: function () {
      var s = '';
      /* 좁은 관(지름 40) → 넓은 관(지름 80 = 단면적 4배) */
      s += F.path('M20,80 H170 L220,60 H460 V140 H220 L170,120 H20 Z', { fill: C.blueL, c: C.ink, w: 2.4 });
      s += arrow(40, 100, 150, 100, { c: C.blue, w: 3, head: 13 });
      s += arrow(300, 100, 330, 100, { c: C.blue, w: 3, head: 13 });
      s += t(95, 56, 'A₁ 좁다', { a: 'm', b: 1 }) + t(340, 40, 'A₂ = 4 × A₁ 넓다', { a: 'm', b: 1 });
      s += t(95, 158, 'v₁ = 20 m/s 빠르다', { a: 'm', b: 1, c: C.red, size: 15 });
      s += t(340, 162, 'v₂ = 5 m/s 느리다', { a: 'm', b: 1, c: C.green, size: 15 });
      s += t(240, 200, 'A₁ × 20 = 4A₁ × 5', { a: 'm', b: 1, size: 17, c: C.blue });
      return F.svg(480, 222, s);
    } },

  bern: { cards: ['베르누이의 정리 — 빨라지면 압력이 내려간다'],
    cap: '베르누이의 정리 — 좁아져 빨라진 곳은 압력이 낮다 (세운 관의 물 높이로 보인다)',
    draw: function () {
      var s = '';
      var pipe = 'M20,150 H150 L200,170 H280 L330,150 H460 V230 H330 L280,210 H200 L150,230 H20 Z';
      /* 세운 관(액주) — 넓은 곳은 높이, 좁은 곳은 낮게 */
      function col(x, yTop, yBot, lvl) {
        return box(x - 9, yTop, 18, yBot - yTop, { fill: C.paper, r: 0, w: 1.8 }) +
          box(x - 7.5, lvl, 15, yBot - lvl + 2, { fill: C.blueL, r: 0, w: 0, c: 'none' }) +
          line(x - 9, lvl, x + 9, lvl, { c: C.blue, w: 2.4 });
      }
      s += col(85, 30, 150, 54) + col(240, 30, 170, 116) + col(395, 30, 150, 54);
      s += F.path(pipe, { fill: C.blueL, c: C.ink, w: 2.4 });
      s += arrow(40, 190, 110, 190, { c: C.blue, w: 2.6 }) + arrow(212, 190, 268, 190, { c: C.blue, w: 3.4, head: 14 });
      s += line(85, 54, 240, 54, { c: C.red, w: 1, dash: '4 3' }) + arrow(240, 56, 240, 112, { c: C.red, w: 1.4, head: 8, both: true });
      s += t(252, 84, '압력이 내려간 만큼', { c: C.red, size: 13 });
      s += t(85, 252, '넓다 · 느리다', { a: 'm', b: 1, size: 15 }) + note(85, 272, '압력 높다');
      s += t(240, 252, '좁다 · 빠르다', { a: 'm', b: 1, size: 15, c: C.red }) + note(240, 272, '압력 낮다', { c: C.red });
      s += t(395, 252, '넓다 · 느리다', { a: 'm', b: 1, size: 15 });
      s += t(240, 298, 'p + ½ρv² + ρgh = 일정', { a: 'm', b: 1, size: 17, c: C.blue });
      return F.svg(480, 318, s);
    } },

  pitot: { cards: ['베르누이의 정리 — 빨라지면 압력이 내려간다'],
    cap: '속도 재기 — 흐름을 정면으로 받는 관과 옆면 관의 차이 Δp 가 ½ρv² 이다',
    draw: function () {
      var s = '';
      s += box(20, 150, 440, 70, { fill: C.blueL, r: 0, w: 2.4 });
      s += arrow(40, 186, 120, 186, { c: C.blue, w: 2.6 });
      /* 옆면 관 */
      s += box(171, 40, 18, 110, { fill: C.paper, r: 0, w: 1.8 }) + box(172.5, 104, 15, 48, { fill: C.blueL, r: 0, w: 0, c: 'none' }) +
        line(171, 104, 189, 104, { c: C.blue, w: 2.4 });
      /* 정면 관 — ㄴ자로 꺾여 입구가 흐름을 마주 본다 */
      s += F.path('M311,40 V178 H262 V194 H329 V40', { fill: C.paper, w: 1.8 });
      s += box(312.5, 64, 15, 128, { fill: C.blueL, r: 0, w: 0, c: 'none' }) + box(264, 179.5, 50, 13, { fill: C.blueL, r: 0, w: 0, c: 'none' });
      s += line(311, 64, 329, 64, { c: C.blue, w: 2.4 });
      s += line(189, 104, 356, 104, { c: C.red, w: 1, dash: '4 3' }) + line(329, 64, 356, 64, { c: C.red, w: 1, dash: '4 3' });
      s += arrow(350, 66, 350, 102, { c: C.red, w: 1.4, head: 8, both: true }) + t(362, 84, 'Δp = ½ρv²', { b: 1, c: C.red });
      s += t(180, 26, '옆면', { a: 'm', b: 1 }) + t(320, 26, '정면', { a: 'm', b: 1 });
      s += note(240, 244, 'v = √(2Δp ÷ ρ)', { size: 16, c: C.ink, b: 1 });
      s += note(240, 270, '보기: 물, Δp = 4.5 kPa → v = √(2 × 4500 ÷ 1000) = 3 m/s');
      return F.svg(480, 290, s);
    } },

  /* ─────────── 3. 실린더 ─────────── */
  'cyl-single': { cards: ['단동 실린더 — 한쪽으로만 힘을 낸다'],
    cap: '단동 실린더 — 한쪽 포트로 공기를 넣어 밀어내고, 돌아올 때는 스프링에 맡긴다',
    draw: function () {
      var s = cylCut(60, 70, 290, 86, 150, 448, { leftFill: C.blueL });
      /* 스프링 (로드 쪽 방) */
      s += spr(162, 90, 180, 1, C.ink, 9) + spr(162, 136, 180, 1, C.ink, 9);
      /* 포트 1개 */
      s += box(84, 44, 18, 26, { fill: C.grayM, r: 1, w: 1.4 });
      s += arrow(93, 10, 93, 60, { c: C.blue, w: 2.6 });
      s += t(104, 22, '공기 (포트 1개)', { b: 1, c: C.blue });
      s += arrow(210, 188, 290, 188, { c: C.blue, w: 2.6 }) + t(250, 208, '공기의 힘으로 전진', { a: 'm', b: 1, c: C.blue, size: 15 });
      s += arrow(290, 234, 210, 234, { c: C.green, w: 2.6 }) + t(250, 254, '스프링이 되돌린다', { a: 'm', b: 1, c: C.green, size: 15 });
      s += callout(156, 150, 110, 190, '피스톤', { a: 'e' }) + callout(250, 96, 330, 30, '스프링') + callout(420, 113, 430, 170, '로드', { a: 'm' });
      return F.svg(480, 272, s);
    } },

  'cyl-double': { cards: ['복동 실린더 — 양쪽으로 힘을 낸다'],
    cap: '복동 실린더 — 포트가 둘, 한쪽에 공기를 넣으면 반대쪽은 배기되어 전진도 후진도 공기로 한다',
    draw: function () {
      var s = '';
      function one(y, fwd) {
        var px = fwd ? 250 : 110;
        var g = cylCut(70, y, 300, 70, px, fwd ? 460 : 320, fwd ? { leftFill: C.blueL } : { rightFill: C.blueL });
        g += box(92, y - 20, 16, 20, { fill: C.grayM, r: 1, w: 1.2 }) + box(332, y - 20, 16, 20, { fill: C.grayM, r: 1, w: 1.2 });
        if (fwd) {
          g += arrow(100, y - 52, 100, y - 24, { c: C.blue, w: 2.4 }) + t(112, y - 44, '공급', { b: 1, c: C.blue, size: 15 });
          g += arrow(340, y - 24, 340, y - 52, { c: C.sub, w: 2.4 }) + t(352, y - 44, '배기', { b: 1, c: C.sub, size: 15 });
        } else {
          g += arrow(100, y - 24, 100, y - 52, { c: C.sub, w: 2.4 }) + t(112, y - 44, '배기', { b: 1, c: C.sub, size: 15 });
          g += arrow(340, y - 52, 340, y - 24, { c: C.blue, w: 2.4 }) + t(352, y - 44, '공급', { b: 1, c: C.blue, size: 15 });
        }
        g += t(24, y + 35, fwd ? '전진' : '후진', { b: 1, size: 17, c: C.blue });
        return g;
      }
      s += one(72, true) + one(222, false);
      s += hdiv(162);
      s += note(240, 308, '로드가 한쪽에만 있는 편로드형 — 후진 쪽 면적이 로드만큼 작다');
      return F.svg(480, 326, s);
    } },

  force: { cards: ['실린더가 내는 힘'],
    cap: 'F = p × A — 후진할 때는 로드가 차지한 만큼 면적이 줄어 힘이 작다',
    draw: function () {
      var s = divider(240, 20, 226);
      s += head(120, 30, '전진할 때') + head(360, 30, '후진할 때');
      s += F.circle(120, 118, 66, { fill: C.blueL, c: C.blue, w: 2.2 });
      s += F.circle(360, 118, 66, { fill: C.blueL, c: C.blue, w: 2.2 }) + F.circle(360, 118, 22, { fill: C.grayM, w: 1.8 });
      s += t(120, 118, '피스톤 전체', { a: 'm', b: 1, halo: false });
      s += callout(360, 118, 430, 200, '로드', { a: 'm' });
      s += t(360, 72, '고리 모양만', { a: 'm', b: 1, size: 15, halo: false, c: C.blue });
      s += t(120, 210, 'A = 피스톤 면적', { a: 'm', size: 15 });
      s += t(340, 214, 'A = 피스톤 − 로드', { a: 'm', size: 15 });
      s += t(240, 252, 'F = p × A', { a: 'm', b: 1, size: 18, c: C.blue });
      s += note(240, 276, '실제로는 마찰 때문에 계산값의 85~90 % 정도');
      return F.svg(480, 294, s);
    } },

  /* ─────────── 4. 방향제어밸브 ─────────── */
  ports: { cards: ['네모 칸 = 위치, 밖으로 나온 선 = 포트'],
    cap: '3/2 way 밸브 — 칸 2개 = 위치 2개, 한 칸에서 밖으로 나온 선 3개 = 포트 3개',
    draw: function () {
      var s = '', x = 150, y = 76, S = 84;
      s += v32(x, y, S, true, { hiC: C.orange });
      s += line(x + S + S * 0.5, y, x + S + S * 0.5, y - 26, { w: 2 });
      s += line(x + S + S * 0.25, y + S, x + S + S * 0.25, y + S + 26, { w: 2 });
      s += line(x + S + S * 0.75, y + S, x + S + S * 0.75, y + S + 22, { w: 2 }) + exh(x + S + S * 0.75, y + S + 22);
      s += t(x + S / 2, 56, '위치 1', { a: 'm', b: 1 }) + note(x + S / 2, 36, '눌렀을 때');
      s += t(x + S + S * 0.5 + 12, 54, '2', { b: 1, c: C.orange, size: 17 });
      s += t(x + S + S * 0.25 - 6, y + S + 26, '1', { a: 'e', b: 1, c: C.orange, size: 17 });
      s += t(x + S + S * 0.75 + 14, y + S + 18, '3', { b: 1, c: C.orange, size: 17 });
      s += callout(x + S * 2 - 6, y + 10, 420, 58, '위치 2 (평소)', { a: 'm', b: 1 });
      s += callout(x + S + S * 0.5 + 6, y + S + 40, 330, 232, '포트 1 · 2 · 3', { c: C.orange, tc: C.orange, b: 1 });
      s += t(240, 272, '칸 2개 · 포트 3개 → 3/2 way 밸브', { a: 'm', b: 1, size: 17, c: C.blue });
      s += note(240, 296, '포트는 평소 칸(스프링 쪽) 한 칸에서만 센다');
      return F.svg(480, 314, s);
    } },

  portnum: { cards: ['포트 번호와 이름'],
    cap: '5/2 way 밸브의 포트 번호 — 1 공급 · 2·4 작업(짝수) · 3·5 배기(홀수) · 12·14 파일럿',
    draw: function () {
      var s = '', L = 140, R = 240, y = 90, S = 100, bot = y + S;
      var P = C.blue, Wk = C.green, E = C.sub, Pi = C.orange;
      s += sq(L, y, S) + sq(R, y, S);
      /* 왼칸(14 쪽) : 1→4, 2→3 · 오른칸(12 쪽) : 1→2, 4→5 (symbols.js v52 와 같은 짜임) */
      s += ia(L + 50, bot - 3, L + 20, y + 3) + ia(L + 80, y + 3, L + 80, bot - 3);
      s += tee(L + 20, bot, -1);
      s += ia(R + 50, bot - 3, R + 80, y + 3) + ia(R + 20, y + 3, R + 20, bot - 3);
      s += tee(R + 80, bot, -1);
      s += pilotOp(L, y + S / 2, -1, Pi) + pilotOp(R + S, y + S / 2, 1, Pi);
      /* 포트 선과 번호 (평소 칸 = 오른칸) */
      s += line(R + 20, y, R + 20, y - 30, { w: 2.2, c: Wk }) + line(R + 80, y, R + 80, y - 30, { w: 2.2, c: Wk });
      s += line(R + 20, bot, R + 20, bot + 28, { w: 2.2, c: E }) + line(R + 50, bot, R + 50, bot + 32, { w: 2.2, c: P }) +
        line(R + 80, bot, R + 80, bot + 28, { w: 2.2, c: E });
      s += t(R + 20, y - 44, '4', { a: 'm', b: 1, c: Wk, size: 18 }) + t(R + 80, y - 44, '2', { a: 'm', b: 1, c: Wk, size: 18 });
      s += t(R + 20, bot + 42, '5', { a: 'm', b: 1, c: E, size: 18 }) + t(R + 50, bot + 46, '1', { a: 'm', b: 1, c: P, size: 18 }) +
        t(R + 80, bot + 42, '3', { a: 'm', b: 1, c: E, size: 18 });
      s += t(L - 30, y + 20, '14', { a: 'm', b: 1, c: Pi, size: 18 }) + t(R + S + 30, y + 20, '12', { a: 'm', b: 1, c: Pi, size: 18 });
      s += t(R + 118, y - 44, '작업 (실린더로)', { b: 1, c: Wk, size: 15 });
      s += t(R + 104, bot + 44, '배기', { b: 1, c: E, size: 15 }) + t(R - 4, bot + 44, '배기', { a: 'e', b: 1, c: E, size: 15 }) + t(R + 50, bot + 70, '공급', { a: 'm', b: 1, c: P, size: 15 });
      s += t(60, y + S / 2 + 30, '파일럿', { a: 'm', b: 1, c: Pi, size: 15 });
      s += t(240, 300, '홀수 = 공급·배기 · 짝수 = 작업', { a: 'm', b: 1, size: 16 });
      return F.svg(480, 318, s);
    } },

  ncno: { cards: ['상시닫힘(NC)과 상시열림(NO)'],
    cap: '평소 상태는 스프링이 붙은 칸 — NC 는 공급이 막혀 있고, NO 는 이미 통해 있다',
    draw: function () {
      var s = divider(240, 16, 250), S = 58;
      function one(x, nc) {
        var y = 92, R = x + S;
        var g = v32(x, y, S, nc, { hiC: C.orange, flowC: nc ? null : C.green });
        g += line(R + S * 0.5, y, R + S * 0.5, y - 30, { w: 2, c: nc ? C.ink : C.green });
        g += line(R + S * 0.25, y + S, R + S * 0.25, y + S + 30, { w: 2, c: C.blue });
        g += line(R + S * 0.75, y + S, R + S * 0.75, y + S + 18, { w: 2 }) + exh(R + S * 0.75, y + S + 18);
        g += arrow(R + S * 0.25, y + S + 58, R + S * 0.25, y + S + 34, { c: C.blue, w: 2 });
        if (!nc) g += arrow(R + S * 0.5, y - 30, R + S * 0.5, y - 56, { c: C.green, w: 2.4 });
        return g;
      }
      s += head(120, 26, '상시닫힘 NC') + head(360, 26, '상시열림 NO');
      s += one(40, true) + one(280, false);
      s += t(136, 72, '막힘', { b: 1, c: C.red, size: 15 });
      s += t(416, 44, '나간다', { b: 1, c: C.green, size: 15 });
      s += note(120, 240, '눌러야 공기가 나간다') + note(360, 240, '눌러야 끊긴다');
      s += note(240, 272, '주황 칸 = 평소 칸 (스프링이 붙은 쪽)', { c: C.orange, b: 1 });
      return F.svg(480, 290, s);
    } },

  solenoid: { cards: ['조작 방식 읽기'],
    cap: '칸 옆 그림이 조작 방식 — 편솔레노이드는 전기가 끊기면 스프링 쪽으로, 양솔레노이드는 그 자리에 머문다',
    draw: function () {
      var s = '', S = 56;
      function valve(y, dbl) {
        var L = 116, R = L + S, bot = y + S;
        var g = sq(L, y, S) + sq(R, y, S);
        g += ia(L + 28, bot - 3, L + 12, y + 3) + ia(L + 44, y + 3, L + 44, bot - 3) + tee(L + 12, bot, -1);
        g += ia(R + 28, bot - 3, R + 44, y + 3) + ia(R + 12, y + 3, R + 12, bot - 3) + tee(R + 44, bot, -1);
        g += sol(L, y + S / 2, -1, C.blue);
        g += dbl ? sol(R + S, y + S / 2, 1, C.blue) : spr(R + S, y + S / 2, 26, 1, C.green);
        return g;
      }
      s += head(20, 30, '편솔레노이드', { a: 's' }) + valve(48, false);
      s += callout(94, 60, 70, 118, '솔레노이드', { c: C.blue, tc: C.blue, a: 'm', size: 14 });
      s += callout(270, 62, 290, 44, '스프링', { c: C.green, tc: C.green, size: 14 });
      s += t(318, 76, '전기가 끊기면', { size: 14, c: C.sub }) + t(318, 98, '스프링 쪽 칸으로', { b: 1, c: C.green, size: 15 });
      s += hdiv(140);
      s += head(20, 170, '양솔레노이드', { a: 's' }) + valve(188, true);
      s += t(318, 216, '전기가 끊기면', { size: 14, c: C.sub }) + t(318, 238, '그 자리에 머문다', { b: 1, c: C.blue, size: 15 });
      s += note(240, 272, '왼쪽 그림이 움직이면 왼쪽 칸, 오른쪽 그림이면 오른쪽 칸이 된다');
      return F.svg(480, 290, s);
    } },

  center3: { cards: ['5/3 way 밸브 — 가운데 위치가 하는 일'],
    cap: '5/3 way 밸브의 가운데 칸 세 가지 — 모두 막힘 · 작업 포트가 배기로 · 양쪽에 압력',
    draw: function () {
      var s = '', S = 72, Y = 70;
      var nm = ['클로즈드 센터', '엑조스트 센터', '프레셔 센터'], res = ['그 자리에 선다', '힘이 빠져 손으로 밀린다', '양쪽에 압력이 걸린다'];
      for (var k = 0; k < 3; k++) {
        var cx = 80 + k * 160, x = cx - S / 2, bot = Y + S, g = '';
        var p4 = x + 18, p2 = x + 54, p5 = x + 12, p1 = x + 36, p3 = x + 60;
        g += box(x - 26, Y, 26, S, { fill: C.grayL, r: 0, w: 1, c: C.grayM }) + box(x + S, Y, 26, S, { fill: C.grayL, r: 0, w: 1, c: C.grayM });
        g += sq(x, Y, S, { c: C.blue });
        if (k === 0) {
          g += tee(p4, Y, 1) + tee(p2, Y, 1) + tee(p5, bot, -1) + tee(p1, bot, -1) + tee(p3, bot, -1);
        } else if (k === 1) {
          g += tee(p1, bot, -1) + ia(p4, Y + 3, p5, bot - 3, C.sub) + ia(p2, Y + 3, p3, bot - 3, C.sub);
        } else {
          g += ia(p1, bot - 3, p4, Y + 3, C.red) + ia(p1, bot - 3, p2, Y + 3, C.red) + tee(p5, bot, -1) + tee(p3, bot, -1);
        }
        g += line(p4, Y, p4, Y - 14, { w: 1.8 }) + line(p2, Y, p2, Y - 14, { w: 1.8 }) +
          line(p5, bot, p5, bot + 14, { w: 1.8 }) + line(p1, bot, p1, bot + 14, { w: 1.8 }) + line(p3, bot, p3, bot + 14, { w: 1.8 });
        if (k === 0) {
          g += note(p4, Y - 24, '4') + note(p2, Y - 24, '2') + note(p5, bot + 26, '5') + note(p1, bot + 26, '1') + note(p3, bot + 26, '3');
        }
        g += t(cx, 196, nm[k], { a: 'm', b: 1, size: 15 }) + note(cx, 220, res[k], { c: k === 2 ? C.red : C.sub });
        s += g;
      }
      s += note(240, 30, '손을 놓으면 가운데 칸(파란 칸)이 된다', { c: C.blue, b: 1, size: 14 });
      return F.svg(480, 240, s);
    } },

  /* ─────────── 5. 속도 제어 ─────────── */
  oneway: { cards: ['속도는 공기의 양으로 정한다'],
    cap: '일방향 유량 조절 밸브 — 한 방향은 교축을 지나 천천히, 반대 방향은 체크 밸브로 그대로',
    draw: function () {
      var s = '';
      function one(y, fwd) {
        var g = line(40, y, 440, y, { w: 2 });
        g += thrH(200, y, fwd ? C.orange : C.ink);
        g += F.path('M160,' + y + ' V' + (y + 40) + ' H240 V' + y, { w: 1.8 });
        g += checkH(200, y + 40, 'r', fwd ? C.red : C.green);
        g += box(146, y - 24, 108, 80, { fill: 'none', r: 4, w: 1.2, c: C.sub, dash: '5 4' });
        if (fwd) {
          g += arrow(60, y - 14, 128, y - 14, { c: C.blue, w: 3, head: 12 }) + arrow(274, y - 14, 300, y - 14, { c: C.blue, w: 1.6, head: 8 });
          g += t(322, y - 14, '가늘게 → 느리다', { b: 1, c: C.orange, size: 15 });
          g += callout(209, y + 40, 280, y + 46, '체크 — 막힘', { c: C.red, tc: C.red, size: 14 });
        } else {
          g += arrow(420, y - 14, 352, y - 14, { c: C.blue, w: 3, head: 12 }) + arrow(130, y - 14, 60, y - 14, { c: C.blue, w: 3, head: 12 });
          g += arrow(236, y + 28, 172, y + 28, { c: C.green, w: 1.6, head: 8 });
          g += callout(209, y + 40, 280, y + 50, '체크 — 열림', { c: C.green, tc: C.green, size: 14 });
          g += t(26, y - 34, '반대 방향 → 그대로 빠르다', { b: 1, c: C.green, size: 15 });
        }
        return g;
      }
      s += t(26, 30, '이쪽 방향', { b: 1, size: 15 });
      s += one(76, true);
      s += hdiv(148);
      s += one(214, false);
      s += note(240, 290, '교축 밸브만 넣으면 양쪽 다 느려진다 — 체크를 붙여 한쪽만 조인다');
      return F.svg(480, 308, s);
    } },

  meter: { cards: ['미터인 · 미터아웃 — 어느 쪽을 조이는가'],
    cap: '공압의 미터 인과 미터 아웃 — 전진할 때 들어가는 공기를 조이느냐, 나오는 공기를 조이느냐',
    draw: function () {
      var s = '';
      function panel(y, out) {
        var g = head(20, y, out ? '미터 아웃 — 나오는 쪽을 조인다' : '미터 인 — 들어가는 쪽을 조인다', { a: 's', c: out ? C.green : C.red });
        var cy = y + 22;
        g += cylSym(90, cy, 230, 40, 150, 380, { fill: out ? C.paper : C.paper });
        if (!out) g += box(92, cy + 2, 56, 36, { fill: C.redL, r: 0, w: 0, c: 'none' }) + box(150, cy, 8, 40, { fill: C.ink, r: 0, w: 1 });
        else g += box(160, cy + 2, 158, 36, { fill: C.greenL, r: 0, w: 0, c: 'none' }) + box(150, cy, 8, 40, { fill: C.ink, r: 0, w: 1 }) +
          line(158, cy + 20, 380, cy + 20, { w: 4 });
        var ay = cy + 40, fy = cy + 86;
        g += line(110, ay, 110, fy - 30, { w: 2, c: C.blue }) + line(300, ay, 300, fy - 30, { w: 2, c: C.sub });
        if (!out) g += fcV(110, fy, false, C.orange) + line(300, fy - 30, 300, fy + 30, { w: 2, c: C.sub });
        else g += line(110, fy - 30, 110, fy + 30, { w: 2, c: C.blue }) + fcV(300, fy, true, C.orange);
        g += arrow(80, fy + 26, 80, fy - 20, { c: C.blue, w: 2.2 }) + t(70, fy + 2, '공급', { a: 'e', b: 1, c: C.blue, size: 14 });
        g += arrow(360, fy - 20, 360, fy + 26, { c: C.sub, w: 2.2 }) + t(370, fy + 2, '배기', { b: 1, c: C.sub, size: 14 });
        g += arrow(330, cy - 10, 400, cy - 10, { c: C.ink, w: 1.8, head: 9 });
        g += t(out ? 90 : 90, fy + 52, out ? '나가는 공기가 뒤에서 버텨 준다 → 속도가 고르다' : '앞쪽 공기가 눌린 채 → 부하가 사라지면 튀어 나간다',
          { b: 1, size: 14, c: out ? C.green : C.red });
        return g;
      }
      s += panel(24, false) + hdiv(196) + panel(222, true);
      return F.svg(480, 400, s);
    } },

  quickexh: { cards: ['더 빠르게 — 급속 배기 밸브'],
    cap: '급속 배기 밸브 — 실린더의 공기를 방향제어밸브까지 되돌리지 않고 그 자리에서 바로 내보낸다',
    draw: function () {
      var s = divider(240, 16, 272);
      function panel(ox, q) {
        var g = head(ox + 112, 28, q ? '급속 배기 밸브' : '없을 때', { c: q ? C.green : C.ink });
        g += cylSym(ox + 26, 52, 170, 36, ox + 120, ox + 222);
        g += arrow(ox + 196, 104, ox + 150, 104, { c: C.sub, w: 1.6, head: 9 }) + note(ox + 144, 104, '후진', { a: 'e' });
        g += sq(ox + 34, 180, 40) + sq(ox + 74, 180, 40);
        g += note(ox + 120, 200, '방향제어밸브', { a: 's' });
        if (!q) {
          g += F.poly([[ox + 50, 88], [ox + 50, 180]], { w: 3.4, c: C.orange });
          g += line(ox + 50, 220, ox + 50, 230, { w: 2 }) + exh(ox + 50, 230, C.orange);
          g += arrow(ox + 36, 124, ox + 36, 164, { c: C.orange, w: 1.6, head: 9 });
          g += t(ox + 62, 134, '밸브까지 먼 길', { b: 1, c: C.orange, size: 14 });
          g += t(ox + 50, 262, '밸브 배기구로 나간다', { b: 1, c: C.orange, size: 14 });
        } else {
          g += line(ox + 50, 88, ox + 50, 104, { w: 3.4, c: C.orange });
          g += box(ox + 30, 104, 40, 28, { fill: C.greenL, c: C.green, r: 3 }) + F.circle(ox + 50, 118, 6, { fill: C.paper, w: 1.4 });
          g += line(ox + 50, 132, ox + 50, 180, { w: 2, c: C.sub, dash: '5 4' });
          g += arrow(ox + 72, 118, ox + 132, 118, { c: C.orange, w: 2.6 });
          g += t(ox + 106, 142, '그 자리에서 바로', { b: 1, c: C.orange, size: 14 });
          g += t(ox + 110, 262, '길이 짧아 빨라진다', { a: 'm', b: 1, c: C.green, size: 14 });
        }
        return g;
      }
      s += panel(8, false) + panel(248, true);
      return F.svg(480, 282, s);
    } },

  /* ─────────── 6. 압력 제어와 논리 밸브 ─────────── */
  seqv: { cards: ['압력제어밸브 네 가지'],
    cap: '시퀀스 밸브 — A 가 끝까지 가서 압력이 설정값에 이르면 그제야 B 쪽 길이 열린다',
    draw: function () {
      var s = '';
      /* 실린더 A · B (세로, 로드가 위) */
      function vcyl(x, ext) {
        var py = ext ? 76 : 146;
        return box(x, 70, 44, 90, { fill: C.paper, r: 2, w: 2 }) +
          box(x, py, 44, 8, { fill: C.ink, r: 0, w: 1 }) + line(x + 22, py, x + 22, ext ? 30 : 58, { w: 4 });
      }
      s += vcyl(60, true) + vcyl(356, false);
      s += t(114, 124, 'A 고정', { b: 1 }) + t(346, 124, 'B 가공', { a: 'e', b: 1 });
      /* 공급관 — A 로 곧장, B 로는 시퀀스 밸브를 지나서 */
      s += arrow(14, 250, 40, 250, { c: C.blue, w: 2.4 }) + note(24, 272, '공급');
      s += line(40, 250, 299, 250, { w: 2.2, c: C.blue }) + line(82, 250, 82, 160, { w: 2.2, c: C.blue });
      s += '<circle cx="82" cy="250" r="3.5" fill="' + C.ink + '"/>';
      var vx = 280, vy = 190, S = 38, mx = vx + S / 2;
      s += line(mx, 250, mx, vy + S, { w: 2.2, c: C.blue });
      s += sq(vx, vy, S) + ia(vx + 10, vy + S - 3, vx + 10, vy + 3) + spr(vx + S, vy + S / 2, 18, 1);
      s += F.poly([[mx, vy + S + 10], [vx - 12, vy + S + 10], [vx - 12, vy + S / 2], [vx, vy + S / 2]], { w: 1.4, dash: '4 3', c: C.orange });
      s += F.poly([[mx, vy], [mx, 176], [378, 176], [378, 160]], { w: 2.2, c: C.green });
      s += t(262, 200, '시퀀스\n밸브', { a: 'e', b: 1, size: 14 });
      s += F.num(130, 58, '1', { c: C.blue }) + note(146, 58, 'A 가 먼저 나간다', { a: 's' });
      s += F.num(150, 230, '2', { c: C.orange }) + t(166, 230, '압력이 오른다', { b: 1, size: 14, c: C.orange });
      s += F.num(352, 206, '3', { c: C.green }) + t(368, 206, '열린다', { b: 1, size: 14, c: C.green });
      s += F.num(300, 40, '4', { c: C.green }) + note(316, 40, 'B 가 나간다', { a: 's' });
      s += note(240, 290, '순서를 압력으로 만든다 (리밋 밸브는 위치로 만든다)');
      return F.svg(480, 308, s);
    } },

  pilot: { cards: ['릴리프와 감압을 헷갈리지 않는 법 — 점선을 보라'],
    cap: '릴리프는 들어오는 쪽 압력을, 감압은 나가는 쪽 압력을 점선(파일럿)으로 보고 있다',
    draw: function () {
      var s = divider(240, 16, 262), S = 70;
      function pv(ox, relief) {
        var x = ox + 70, y = 90, bot = y + S, mx = x + S / 2;
        var g = head(ox + 110, 28, relief ? '릴리프 밸브' : '감압 밸브');
        g += sq(x, y, S);
        g += relief ? ia(x + 18, bot - 4, x + 18, y + 4) : ia(mx, bot - 4, mx, y + 4, C.green);
        g += line(mx, bot, mx, bot + 34, { w: 2 }) + line(mx, y, mx, y - 30, { w: 2 });
        g += spr(x + S, y + S / 2, 24, 1);
        var py = relief ? bot + 18 : y - 16;
        g += F.poly([[mx, py], [x - 22, py], [x - 22, y + S / 2], [x, y + S / 2]], { w: 2, dash: '5 4', c: C.orange });
        g += '<circle cx="' + mx + '" cy="' + py + '" r="3.5" fill="' + C.orange + '"/>';
        g += arrow(mx + 22, bot + 32, mx + 22, bot + 6, { c: C.blue, w: 1.8, head: 9 }) + note(mx + 30, bot + 22, '입구', { a: 's' });
        g += note(mx + 12, y - 22, '출구', { a: 's' });
        g += t(ox + 110, 228, relief ? '입구 압력을 본다' : '출구 압력을 본다', { a: 'm', b: 1, c: C.orange, size: 15 });
        g += note(ox + 110, 252, relief ? '평소 닫힘 — 넘치면 연다' : '평소 열림 — 높으면 조인다', { c: relief ? C.ink : C.green, b: 1 });
        return g;
      }
      s += pv(10, true) + pv(250, false);
      return F.svg(480, 272, s);
    } },

  shuttle: { cards: ['셔틀 밸브 — 공기로 만드는 OR 과 AND'],
    cap: '셔틀 밸브의 속 — 고압 우선형은 한쪽만 와도 나가고(OR), 2압 밸브는 한쪽만 오면 스스로 막는다(AND)',
    draw: function () {
      var s = divider(240, 16, 262);
      /* 몸통 — 가로 관 + 가운데 위 출구 A */
      function body(ox) {
        return box(ox + 20, 110, 180, 44, { fill: C.grayL, r: 4, w: 2 }) +
          F.path('M' + (ox + 100) + ',110 V70 M' + (ox + 120) + ',110 V70', { w: 2 }) +
          line(ox - 4, 124, ox + 20, 124, { w: 2 }) + line(ox - 4, 140, ox + 20, 140, { w: 2 }) +
          line(ox + 200, 124, ox + 224, 124, { w: 2 }) + line(ox + 200, 140, ox + 224, 140, { w: 2 });
      }
      /* OR */
      s += head(120, 28, '고압 우선형 = OR');
      s += body(10);
      s += F.path('M200,114 L208,124 M200,150 L208,140', { w: 2 });
      s += F.circle(198, 132, 14, { fill: C.sub, w: 1.4 });
      s += arrow(0, 132, 60, 132, { c: C.blue, w: 3, head: 12 }) + t(10, 104, 'X 신호', { b: 1, c: C.blue, size: 14 });
      s += F.route([[80, 132], [120, 132], [120, 52]], { c: C.blue, w: 2.4 }) + t(134, 58, 'A 나감', { b: 1, c: C.green, size: 14 });
      s += t(214, 104, 'Y', { b: 1, size: 14, c: C.sub, a: 'm' });
      s += callout(190, 146, 150, 190, '볼이 Y 를 막는다', { a: 'm', size: 13 });
      s += note(120, 232, 'X 만 와도 · Y 만 와도 나간다', { b: 1, c: C.green });
      /* AND — 2압 밸브: 안쪽 시트 둘, 양 끝에 원판이 달린 스풀 */
      var ox = 250;
      s += head(360, 28, '2압 밸브 = AND');
      s += body(ox);
      s += box(ox + 78, 110, 6, 14, { fill: C.ink, r: 0, w: 0 }) + box(ox + 78, 140, 6, 14, { fill: C.ink, r: 0, w: 0 }) +
        box(ox + 136, 110, 6, 14, { fill: C.ink, r: 0, w: 0 }) + box(ox + 136, 140, 6, 14, { fill: C.ink, r: 0, w: 0 });
      s += line(ox + 72, 132, ox + 162, 132, { w: 3, c: C.sub });
      s += box(ox + 66, 116, 10, 32, { fill: C.sub, r: 1, w: 1 }) + box(ox + 158, 116, 10, 32, { fill: C.sub, r: 1, w: 1 });
      s += arrow(ox - 10, 132, ox + 50, 132, { c: C.blue, w: 3, head: 12 }) + t(ox, 104, 'X 신호', { b: 1, c: C.blue, size: 14 });
      s += t(ox + 214, 104, 'Y', { b: 1, size: 14, c: C.sub, a: 'm' });
      s += t(ox + 110, 58, 'A 안 나감', { a: 'm', b: 1, c: C.red, size: 14 });
      s += callout(ox + 71, 148, ox + 110, 190, 'X 쪽 길을 스스로 막는다', { a: 'm', size: 13 });
      s += note(360, 232, 'X 와 Y 가 둘 다 와야 나간다', { b: 1, c: C.green });
      return F.svg(480, 272, s);
    } },

  /* ─────────── 7. 공기압 회로 ─────────── */
  logic: { cards: ['공기로 만드는 판단 — 논리 회로 다섯'],
    cap: '직렬이냐 병렬이냐가 전부다 — 밸브 둘을 직렬로 이으면 AND, 병렬로 이으면 OR',
    draw: function () {
      var s = '';
      function vb(x, y, l) {
        return box(x, y, 50, 36, { fill: C.paper, r: 2, w: 1.8, label: l, size: 16 }) + line(x, y + 18, x - 8, y + 18, { w: 1.6 }) +
          box(x - 16, y + 11, 8, 14, { fill: C.paper, r: 1, w: 1.6 });
      }
      s += head(20, 30, 'AND — 직렬', { a: 's' }) + note(470, 30, '둘 다 눌러야 나간다', { a: 'e', b: 1, c: C.blue });
      s += pumpSym(44, 90, 16, false);
      s += line(60, 90, 140, 90, { w: 2.2, c: C.blue }) + vb(140, 72, 'A') + line(190, 90, 270, 90, { w: 2.2, c: C.blue }) + vb(270, 72, 'B');
      s += arrow(320, 90, 450, 90, { w: 2.2, c: C.blue }) + note(390, 72, '출력', { b: 1 });
      s += hdiv(134);
      s += head(20, 164, 'OR — 병렬', { a: 's' }) + note(470, 164, '하나만 눌러도 나간다', { a: 'e', b: 1, c: C.blue });
      s += pumpSym(44, 244, 16, false);
      s += F.poly([[60, 244], [100, 244]], { w: 2.2, c: C.blue }) + F.poly([[100, 206], [100, 282]], { w: 2.2, c: C.blue });
      s += line(100, 206, 170, 206, { w: 2.2, c: C.blue }) + vb(170, 188, 'A') + line(100, 282, 170, 282, { w: 2.2, c: C.blue }) + vb(170, 264, 'B');
      s += F.poly([[220, 206], [300, 206], [300, 230]], { w: 2.2, c: C.blue }) + F.poly([[220, 282], [300, 282], [300, 258]], { w: 2.2, c: C.blue });
      s += box(286, 230, 28, 28, { fill: C.paper, r: 3, w: 1.8 }) + F.circle(300, 244, 6, { fill: C.sub, w: 1 });
      s += callout(314, 236, 348, 212, '셔틀 밸브', { size: 14 });
      s += arrow(314, 244, 450, 244, { w: 2.2, c: C.blue }) + note(390, 262, '출력', { b: 1 });
      return F.svg(480, 306, s);
    } },

  ff: { cards: ['기억하는 회로 — 플립플롭'],
    cap: '플립플롭 — 신호 A 를 잠깐 주면 켜지고, 신호 B 를 줄 때까지 출력이 그대로 남는다',
    draw: function () {
      var s = '', x0 = 110, x1 = 460;
      function lane(y, name, c) {
        return t(20, y - 12, name, { b: 1, c: c, size: 15 }) + line(x0, y, x1, y, { c: C.grayM, w: 1.2 });
      }
      s += lane(70, '신호 A', C.blue) + lane(140, '신호 B', C.red) + lane(222, '출력', C.green);
      s += F.poly([[x0, 70], [150, 70], [150, 40], [190, 40], [190, 70], [x1, 70]], { c: C.blue, w: 2.6 });
      s += F.poly([[x0, 140], [330, 140], [330, 110], [370, 110], [370, 140], [x1, 140]], { c: C.red, w: 2.6 });
      s += F.poly([[x0, 222], [150, 222], [150, 180], [330, 180], [330, 222], [x1, 222]], { c: C.green, w: 3 });
      s += box(190, 176, 140, 8, { fill: C.greenL, r: 2, w: 0, c: 'none' });
      s += line(150, 30, 150, 236, { c: C.sub, w: 1, dash: '4 3' }) + line(330, 30, 330, 236, { c: C.sub, w: 1, dash: '4 3' });
      s += t(260, 164, '손을 떼도 유지', { a: 'm', b: 1, c: C.green, size: 15 });
      s += note(170, 26, '잠깐', { a: 'm' }) + note(350, 96, '잠깐', { a: 'm' });
      s += arrow(x0, 258, x1, 258, { c: C.sub, w: 1.4, head: 9 }) + note(x1 - 10, 276, '시간', { a: 'e' });
      return F.svg(480, 290, s);
    } },

  hold: { cards: ['전기로 기억하기 — 자기 유지 회로'],
    cap: '자기 유지 회로(OFF 우선) — ON 버튼과 나란히 붙은 K 접점이 손을 뗀 뒤에도 전류 길을 잡아 준다',
    draw: function () {
      var s = '', L = 34, R = 446, y1 = 80, y2 = 156, J = 200;
      /* a접점: | |  ·  b접점: |/| */
      function aC(x, y, c) { return line(x - 8, y - 13, x - 8, y + 13, { w: 2.2, c: c }) + line(x + 8, y - 13, x + 8, y + 13, { w: 2.2, c: c }); }
      function bC(x, y, c) { return aC(x, y, c) + line(x - 14, y + 13, x + 14, y - 13, { w: 1.8, c: c }); }
      var G = C.green;
      s += line(L, 40, L, 196, { w: 3 }) + line(R, 40, R, 196, { w: 3 });
      /* 1단 : 모선 ─ ON ─ J ─ OFF ─ K 코일 ─ 모선 */
      s += line(L, y1, 102, y1, { w: 2 }) + aC(110, y1) + line(118, y1, J, y1, { w: 2 });
      s += line(J, y1, 272, y1, { w: 2, c: G }) + bC(280, y1, G) + line(288, y1, 364, y1, { w: 2, c: G });
      s += F.circle(384, y1, 20, { fill: C.greenL, c: G, w: 2.2 }) + t(384, y1 + 1, 'K', { a: 'm', b: 1, size: 17, halo: false });
      s += line(404, y1, R, y1, { w: 2, c: G });
      /* 2단 : K 접점 — ON 과 병렬 */
      s += line(L, y2, 102, y2, { w: 2, c: G }) + aC(110, y2, G) + F.poly([[118, y2], [J, y2], [J, y1]], { w: 2, c: G });
      s += '<circle cx="' + J + '" cy="' + y1 + '" r="4" fill="' + C.ink + '"/>';
      s += t(110, 44, 'ON (기동)', { a: 'm', b: 1, size: 15 }) + t(280, 44, 'OFF (정지)', { a: 'm', b: 1, size: 15 });
      s += t(384, 44, '릴레이', { a: 'm', size: 13, c: C.sub });
      s += t(110, 190, 'K 접점', { a: 'm', b: 1, size: 15, c: G });
      s += F.route([[150, 146], [184, 146], [184, 102]], { c: G, w: 2, head: 9, flow: true });
      s += t(236, 150, '손을 뗀 뒤 전류 길', { b: 1, c: G, size: 14, a: 's' });
      s += note(240, 226, 'OFF 가 두 길 모두와 직렬 → 두 버튼을 함께 누르면 정지가 이긴다');
      return F.svg(480, 244, s);
    } },

  delay: { cards: ['늦게 보내기 — 시간 지연 회로'],
    cap: '시간 지연 밸브 — 교축으로 가늘게 채운 탱크의 압력이 차오르면 그제야 3/2 밸브가 넘어간다',
    draw: function () {
      var s = '';
      s += arrow(14, 70, 44, 70, { c: C.blue, w: 2.2 }) + t(28, 46, '신호', { a: 'm', b: 1, size: 14, c: C.blue });
      s += line(44, 70, 140, 70, { w: 2 }) + thrH(92, 70, C.orange);
      s += t(92, 104, '교축', { a: 'm', b: 1, size: 15, c: C.orange });
      s += box(140, 46, 88, 48, { fill: C.blueL, c: C.blue, r: 16 }) + t(184, 70, '탱크', { a: 'm', b: 1, halo: false });
      s += F.poly([[228, 70], [262, 70]], { w: 1.6, dash: '5 4' });
      s += F.poly([[262, 62], [262, 78], [276, 70]], { close: 1, fill: C.paper, w: 1.4 });
      s += sq(276, 42, 56) + sq(332, 42, 56) + spr(388, 70, 20, 1);
      s += ia(290, 95, 304, 45) + tee(318, 98, -1) + ia(360, 45, 374, 95) + tee(346, 98, -1);
      s += line(360, 42, 360, 20, { w: 2 }) + arrow(360, 42, 360, 14, { c: C.green, w: 2.2 }) + t(372, 20, '출력', { b: 1, c: C.green, size: 14 });
      s += line(346, 98, 346, 118, { w: 2 }) + note(346, 130, '공급');
      /* 그래프 */
      var gx = 70, gy = 272, gw = 380;
      s += arrow(gx, gy, gx + gw, gy, { c: C.sub, w: 1.4, head: 9 }) + arrow(gx, gy, gx, 150, { c: C.sub, w: 1.4, head: 9 });
      s += note(gx + gw - 4, gy + 18, '시간', { a: 'e' }) + t(gx - 8, 160, '탱크\n압력', { a: 'e', size: 13, c: C.sub });
      s += line(gx, 190, gx + gw - 10, 190, { c: C.red, w: 1.4, dash: '6 4' }) + t(gx + 8, 180, '전환 압력', { size: 13, c: C.red, b: 1 });
      s += F.path('M' + gx + ',' + gy + ' C' + (gx + 90) + ',' + (gy - 40) + ' ' + (gx + 190) + ',' + 186 + ' ' + (gx + 360) + ',' + 168, { c: C.blue, w: 2.6 });
      s += line(gx + 212, 190, gx + 212, gy, { c: C.green, w: 1.4, dash: '4 3' });
      s += arrow(gx + 4, gy - 16, gx + 208, gy - 16, { c: C.green, w: 1.4, head: 8, both: true }) + t(gx + 106, gy - 30, '지연 시간', { a: 'm', b: 1, c: C.green, size: 14 });
      return F.svg(480, 298, s);
    } },

  recip: { cards: ['혼자 왔다 갔다 하게 — 자동 왕복 회로'],
    cap: '자동 왕복 — 전진 끝의 리밋 2 가 후진 신호, 후진 끝의 리밋 1 이 전진 신호가 되어 서로를 부른다',
    draw: function () {
      var s = '';
      s += cylSym(24, 100, 200, 46, 120, 350);
      s += box(346, 100, 16, 22, { fill: C.orangeL, c: C.orange, r: 2, w: 1.4 });
      s += arrow(372, 150, 420, 150, { c: C.ink, w: 1.6, head: 9 }) + note(396, 168, '전진 중');
      function ls(x, lbl, c) {
        return box(x - 20, 42, 40, 26, { fill: C.paper, r: 2, w: 1.8 }) + line(x, 68, x, 80, { w: 1.8 }) +
          F.circle(x, 88, 8, { fill: C.paper, w: 1.8 }) + t(x, 26, lbl, { a: 'm', b: 1, size: 15, c: c });
      }
      s += ls(262, '리밋 1', C.blue) + ls(440, '리밋 2', C.red);
      s += callout(354, 100, 316, 78, '도그', { size: 13, a: 'e' });
      s += F.num(28, 214, '1', { c: C.red }) + t(46, 214, '전진 끝 — 도그가 리밋 2 를 누른다 → 후진 신호', { b: 1, size: 14, c: C.red });
      s += F.num(28, 248, '2', { c: C.blue }) + t(46, 248, '후진 끝 — 도그가 리밋 1 을 누른다 → 전진 신호', { b: 1, size: 14, c: C.blue });
      s += note(240, 284, '서로가 서로를 부르며, 시동 신호가 있는 동안 계속 왕복한다');
      return F.svg(480, 302, s);
    } },

  /* ─────────── 9. 유압 회로 ─────────── */
  setp: { cards: ['유압 회로의 출발점 — 압력 설정 회로'],
    cap: '압력 설정 회로 — 압력이 설정값을 넘으면 릴리프 밸브가 열려 남는 기름을 탱크로 보낸다',
    draw: function () {
      var s = '';
      s += tank(70, 244, 70) + line(105, 244, 105, 214, { w: 2 });
      s += pumpSym(105, 196, 18, true) + line(87, 196, 70, 196, { w: 2, dash: '2 3' }) + motorM(56, 196);
      s += line(105, 178, 105, 70, { w: 2.4, c: C.blue });
      s += line(105, 70, 440, 70, { w: 2.4, c: C.blue }) + arrow(400, 70, 450, 70, { c: C.blue, w: 2.4 });
      s += t(420, 50, '회로로', { a: 'm', b: 1, c: C.blue });
      s += '<circle cx="105" cy="120" r="4" fill="' + C.ink + '"/>' + line(105, 120, 170, 120, { w: 2 }) + gauge(188, 120, 18);
      s += '<circle cx="105" cy="70" r="4" fill="' + C.ink + '"/>';
      /* 릴리프 밸브 */
      var vx = 280, vy = 110, S = 56, mx = vx + S / 2;
      s += F.poly([[250, 70], [250, 80], [mx, 80], [mx, vy]], { w: 2.2, c: C.blue });
      s += '<circle cx="250" cy="70" r="4" fill="' + C.ink + '"/>';
      s += sq(vx, vy, S) + ia(vx + 14, vy + 3, vx + 14, vy + S - 3) + spr(vx + S, vy + S / 2, 22, 1);
      s += F.poly([[mx, vy - 10], [vx - 16, vy - 10], [vx - 16, vy + S / 2], [vx, vy + S / 2]], { w: 1.6, dash: '4 3', c: C.orange });
      s += line(mx, vy + S, mx, 244, { w: 2.4, c: C.orange }) + tank(mx - 30, 244, 60);
      s += arrow(mx + 22, 190, mx + 22, 232, { c: C.orange, w: 2.2 }) + t(mx + 32, 206, '넘치면\n탱크로', { b: 1, c: C.orange, size: 14 });
      s += t(105, 280, '펌프', { a: 'm', b: 1 }) + t(214, 120, '압력계', { b: 1, size: 14 });
      s += t(mx + 50, 132, '릴리프\n밸브', { b: 1, size: 15 });
      s += t(56, 226, '전동기', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 298, s);
    } },

  unload: { cards: ['일을 쉴 때 — 펌프 무부하 회로'],
    cap: '일을 쉴 때 — 높은 압력으로 릴리프에 버리면 열이 되고, 탠덤 센터 중립이면 낮은 압력으로 탱크에 돌아간다',
    draw: function () {
      var s = divider(240, 16, 282);
      /* 왼쪽 — 릴리프로 버림 */
      s += head(120, 28, '릴리프로 버린다', { c: C.red });
      s += tank(60, 250, 50) + line(85, 250, 85, 226, { w: 2 }) + pumpSym(85, 210, 16, true);
      s += line(85, 194, 85, 90, { w: 3, c: C.red });
      s += tee(85, 90, -1) + note(98, 72, '실린더는 멈춰 있다', { a: 's' });
      var vx = 150, vy = 120, S = 46, mx = vx + S / 2;
      s += '<circle cx="85" cy="100" r="4" fill="' + C.ink + '"/>' + F.poly([[85, 100], [mx, 100], [mx, vy]], { w: 3, c: C.red });
      s += sq(vx, vy, S) + ia(vx + 12, vy + 3, vx + 12, vy + S - 3, C.red) + spr(vx + S, vy + S / 2, 16, 1);
      s += line(mx, vy + S, mx, 250, { w: 3, c: C.red }) + tank(mx - 25, 250, 50);
      s += t(120, 296 - 8, '높은 압력 그대로 → 열', { a: 'm', b: 1, c: C.red, size: 15 });
      /* 오른쪽 — 탠덤 센터 */
      var ox = 250;
      s += head(360, 28, '탠덤 센터 중립', { c: C.green });
      var x = ox + 74, y = 96, W = 64;
      s += box(x - 40, y, 40, W, { fill: C.grayL, r: 0, w: 1, c: C.grayM }) + box(x + W, y, 40, W, { fill: C.grayL, r: 0, w: 1, c: C.grayM });
      s += sq(x, y, W, { c: C.green });
      var pA = x + 16, pB = x + 48;
      s += tee(pA, y, 1) + tee(pB, y, 1);
      s += F.poly([[pA, y + W], [pA, y + 40], [pB, y + 40], [pB, y + W]], { w: 2.4, c: C.green });
      s += line(pA, y, pA, y - 20, { w: 1.8 }) + line(pB, y, pB, y - 20, { w: 1.8 });
      s += note(pA, y - 30, 'A') + note(pB, y - 30, 'B');
      s += line(pA, y + W, pA, 196, { w: 2.4, c: C.green }) + pumpSym(pA, 212, 16, true) + line(pA, 228, pA, 250, { w: 2 }) + tank(pA - 24, 250, 48);
      s += line(pB, y + W, pB, 250, { w: 2.4, c: C.green });
      s += tank(pB - 4, 250, 40);
      s += note(pA - 12, y + W + 16, 'P', { a: 'e' }) + note(pB + 12, y + W + 16, 'T', { a: 's' });
      s += t(360, 288, 'P → T 낮은 압력으로 돌아간다', { a: 'm', b: 1, c: C.green, size: 15 });
      return F.svg(480, 306, s);
    } },

  speed3: { cards: ['유압의 속도 제어 세 가지'],
    cap: '유량 조절 밸브를 어디에 두는가 — 들어가는 쪽(미터 인) · 나오는 쪽(미터 아웃) · 옆으로 빼는 쪽(블리드 오프). 릴리프·방향제어밸브는 생략',
    draw: function () {
      var s = divider(160, 20, 300) + divider(320, 20, 300);
      var nm = ['미터 인', '미터 아웃', '블리드 오프'], use = ['밀어 누르는 부하', '끌어당기는 부하', '하중이 안정된 곳'];
      var cc = [C.blue, C.green, C.purple];
      for (var k = 0; k < 3; k++) {
        var ox = k * 160, g = '';
        g += head(ox + 80, 26, nm[k], { c: cc[k] });
        g += cylSym(ox + 22, 48, 110, 30, ox + 60, ox + 150);
        var inX = ox + 34, outX = ox + 120;
        /* 펌프 · 탱크 */
        g += pumpSym(inX, 250, 14, true) + tank(inX - 16, 270, 32) + line(inX, 264, inX, 270, { w: 1.6 });
        g += tank(outX - 12, 270, 24);
        if (k === 0) {
          g += line(inX, 78, inX, 110, { w: 2, c: C.blue }) + fcV(inX, 140, false, C.orange) + line(inX, 170, inX, 236, { w: 2, c: C.blue });
          g += line(outX, 78, outX, 270, { w: 2 });
        } else if (k === 1) {
          g += line(inX, 78, inX, 236, { w: 2, c: C.blue });
          g += line(outX, 78, outX, 110, { w: 2 }) + fcV(outX, 140, true, C.orange) + line(outX, 170, outX, 270, { w: 2 });
        } else {
          g += line(inX, 78, inX, 236, { w: 2, c: C.blue });
          g += '<circle cx="' + inX + '" cy="196" r="3.5" fill="' + C.ink + '"/>';
          g += F.poly([[inX, 196], [ox + 80, 196], [ox + 80, 270]], { w: 2, c: C.orange }) + thrV(ox + 80, 232, C.orange);
          g += line(outX, 78, outX, 270, { w: 2 });
          g += tank(ox + 66, 270, 28);
        }
        g += note(ox + 80, 306, use[k], { b: 1, c: cc[k] });
        s += g;
      }
      s += note(240, 336, '남는 기름 — 미터 인·아웃은 릴리프로, 블리드 오프는 곧장 탱크로');
      return F.svg(480, 354, s);
    } },

  backp: { cards: ['왜 미터 아웃이 폭주를 막는가'],
    cap: '인장 하중에는 미터 아웃 — 나오는 쪽을 조이면 로드 쪽에 배압이 생겨 부하를 뒤에서 붙잡는다',
    draw: function () {
      var s = '';
      /* 세운 실린더 — 로드가 아래, 매달린 부하 */
      var x = 150, y = 40, w = 90, h = 150, py = 90;
      s += box(x, y, w, h, { fill: C.paper, r: 2, w: 2.2 });
      s += box(x + 2, y + 2, w - 4, py - y - 2, { fill: C.blueL, r: 0, w: 0, c: 'none' });
      s += box(x + 2, py + 10, w - 4, y + h - py - 12, { fill: C.orangeL, r: 0, w: 0, c: 'none' });
      s += box(x, py, w, 10, { fill: C.ink, r: 0, w: 1 }) + line(x + w / 2, py + 10, x + w / 2, 240, { w: 6 });
      s += box(x + 10, 240, 70, 44, { fill: C.grayM, r: 3, w: 1.6, label: '부하', size: 15 });
      s += arrow(x + w / 2, 290, x + w / 2, 318, { c: C.red, w: 3, head: 13 }) + t(x + w / 2 + 14, 306, '부하가 당긴다', { b: 1, c: C.red, size: 14 });
      /* 들어가는 쪽 (위) */
      s += F.poly([[x + 20, y], [x + 20, 20], [60, 20]], { w: 2, c: C.blue }) + arrow(40, 20, 60, 20, { c: C.blue, w: 1.8, head: 9 });
      s += t(40, 42, '들어간다', { a: 'm', size: 13, c: C.blue, b: 1 });
      /* 나오는 쪽 (아래) — 조임 */
      s += F.poly([[x + w, 176], [340, 176], [340, 196]], { w: 2 }) + fcV(340, 226, true, C.orange) + line(340, 256, 340, 284, { w: 2 }) + tank(324, 284, 32);
      s += t(386, 226, '조임', { b: 1, c: C.orange });
      s += callout(x + 60, 150, 290, 120, '배압', { b: 1, c: C.orange, tc: C.orange });
      s += t(290, 96, '뒤에서 붙잡는다', { size: 14, c: C.orange });
      return F.svg(480, 330, s);
    } },

  compress: { cards: ['같은 미터 인인데 공압에서는 왜 튈까'],
    cap: '공기는 눌렸다가 스프링처럼 튀고(압축성), 기름은 거의 눌리지 않아 그대로 잡힌다(비압축성)',
    draw: function () {
      var s = '';
      function row(y, air) {
        var g = head(20, y - 8, air ? '공기 — 눌린다' : '기름 — 안 눌린다', { a: 's', c: air ? C.red : C.blue });
        g += box(40, y + 10, 250, 60, { fill: C.paper, r: 3, w: 2.2 });
        if (air) {
          g += spr(44, y + 40, 150, 1, C.red, 16);
          for (var i = 0; i < 9; i++) g += '<circle cx="' + (58 + i * 16) + '" cy="' + (y + 22 + (i % 3) * 18) + '" r="2.6" fill="' + C.blue + '"/>';
        } else {
          g += box(42, y + 12, 152, 56, { fill: C.blueL, r: 0, w: 0, c: 'none' });
        }
        g += box(194, y + 10, 10, 60, { fill: C.ink, r: 0, w: 1 }) + line(204, y + 40, 360, y + 40, { w: 5 });
        g += arrow(420, y + 40, 364, y + 40, { c: C.sub, w: 2.4 }) + t(430, y + 28, '부하', { size: 14, c: C.sub, b: 1 });
        g += t(250, y + 94, air ? '부하가 사라지면 → 튀어 나간다 (급진)' : '부하가 변해도 → 속도가 그대로', { a: 'm', b: 1, size: 14, c: air ? C.red : C.blue });
        return g;
      }
      s += row(34, true) + hdiv(150) + row(184, false);
      return F.svg(480, 308, s);
    } }

  };
}());
})();
/* ── 복사본: 시퀀스 PLC 마스터/figs.js ── */
FIGS_SRC.S = (function () {
/* ══════════════════════════════════════════════════════════════
   시퀀스·PLC 마스터 — 그림 모음 (그림07 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기) · lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', stage:[단계…], cards:['lesson.js 주제 제목'…], draw:function(){ … } }
       stage — 게임 단계(1~8). 그 단계 시작 화면 「📖 먼저 배우기」의 그림 격자에 나온다
       cards — lesson.js RAW 의 제목(t)과 **똑같이**. 그 배우기 카드에 🖼️ 단추가 생긴다
     순서 = 화면에 나오는 순서.

   그림 내용은 이 도구의 lesson.js 요점 · 게임 해설을 그대로 옮긴 것이다(수치도 거기 있는 것만:
   Y-Δ 기동 전류 1/3 · 타이머 0.1초 단위 · TON T0000 30 = 3초 · 3상 380V · 단상 220V/DC 24V).
   접점 기호는 게임과 같은 KS 유접점 표기(a = 떨어진 접점, b = 붙은 접점 + 사선).
   래더는 X(입력) · Y(출력) 표기 — 이 도구의 약속. LS 실물 PLC 의 P 번지는 참고로만 적는다.
   ══════════════════════════════════════════════════════════════ */
return (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow;

  /* ── 작은 도우미 ─────────────────────────────── */
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3) + '" fill="' + (c || C.ink) + '"/>'; }
  /* 전선 — w(x1,y,x2[,색,흐름]) 은 가로선, w(x1,y1,x2,y2[,색,흐름]) 은 두 점 사이 */
  function w(x1, y1, x2, y2, c, flow) {
    if (typeof y2 !== 'number') { flow = c; c = y2; y2 = y1; }
    return line(x1, y1, x2, y2, { c: c || C.ink, w: 2, flow: flow });
  }
  function wp(pts, c, flow) { return F.poly(pts, { c: c || C.ink, w: 2, flow: flow }); }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }

  /* 유접점(시퀀스) 접점 — 가로. 단자는 x-hw · x+hw
     o.closed(기본: a=열림 · b=닫힘) · o.push 누름버튼 · o.timer 한시 · o.limit 리밋 · o.c 색 */
  function sc(type, x, y, o) {
    o = o || {};
    var hw = o.hw || 18, c = o.c || C.ink, L = x - hw, R = x + hw, fx = x + 7, s = '';
    var closed = o.closed != null ? o.closed : type === 'b';
    s += dot(L, y, 2.6, c);
    s += closed ? line(L, y, fx, y, { c: c, w: 2.4 }) : line(L, y, x + 3, y - 16, { c: c, w: 2.4 });
    s += line(fx, y, R, y, { c: c, w: 2.4 });
    if (type === 'a') s += line(fx, y - 6, fx, y + 6, { c: c, w: 2 });
    if (type === 'b') s += line(x - 5, y + 9, x + 10, y - 12, { c: c, w: 1.8 });
    if (o.push) s += line(x + 1, closed ? y - 3 : y - 15, x + 1, y - 30, { c: c, w: 1.8 }) + line(x - 9, y - 30, x + 11, y - 30, { c: c, w: 2.4 });
    if (o.timer) s += F.path('M' + (x - 12) + ',' + (y - 22) + ' A12,12 0 0 1 ' + (x + 12) + ',' + (y - 22), { c: c, w: 1.8 });
    if (o.limit) s += line(L, y, L - 11, y - 14, { c: c, w: 1.8 }) + F.circle(L - 14, y - 18, 4.5, { fill: C.paper, c: c, w: 1.8 });
    return s;
  }
  /* 세로 a접점(주회로용) — y0 에서 y0+34 까지 */
  function vc(x, y0, c) {
    c = c || C.ink;
    return line(x, y0, x, y0 + 8, { c: c, w: 2.4 }) + line(x, y0 + 26, x, y0 + 34, { c: c, w: 2.4 }) +
      line(x, y0 + 26, x + 10, y0 + 10, { c: c, w: 2.4 }) + dot(x, y0 + 26, 2.4, c);
  }
  /* 릴레이·MC 코일(원) */
  function coil(x, y, lbl, o) {
    o = o || {};
    return F.circle(x, y, o.r || 16, { fill: o.on ? C.greenL : C.paper, c: o.c || (o.on ? C.green : C.ink), w: 2.2 }) +
      (lbl ? t(x, y + 0.5, lbl, { a: 'm', size: o.size || 13, b: 1, c: o.c || (o.on ? C.green : C.ink), halo: false }) : '');
  }
  /* 표시등(원 + X) */
  function lamp(x, y, o) {
    o = o || {};
    var c = o.c || C.ink, r = o.r || 15, k = r * 0.7;
    return F.circle(x, y, r, { fill: o.on ? C.yellowL : C.paper, c: c, w: 2.2 }) +
      line(x - k, y - k, x + k, y + k, { c: c, w: 1.8 }) + line(x - k, y + k, x + k, y - k, { c: c, w: 1.8 });
  }
  /* 끊어진 선 표시 */
  function cut(x, y) {
    return line(x - 6, y - 7, x + 6, y + 7, { c: C.red, w: 2.4 }) + line(x - 6, y + 7, x + 6, y - 7, { c: C.red, w: 2.4 });
  }

  /* PLC 래더 — a접점 ┤├ (단자 x±6) · b접점은 o.b · 이름표는 위(o.below 면 아래) */
  function la(x, y, lbl, o) {
    o = o || {};
    var c = o.c || C.ink, s = line(x - 6, y - 14, x - 6, y + 14, { c: c, w: 2.4 }) + line(x + 6, y - 14, x + 6, y + 14, { c: c, w: 2.4 });
    if (o.b) s += line(x - 10, y + 12, x + 10, y - 12, { c: c, w: 2 });
    if (lbl) s += t(x, o.below ? y + 27 : y - 27, lbl, { a: 'm', size: o.size || 14, b: 1, c: c });
    return s;
  }
  /* 래더 코일 ( ) — 단자 x±9 */
  function lc(x, y, lbl, o) {
    o = o || {};
    var c = o.c || C.blue;
    return F.path('M' + (x - 3) + ',' + (y - 14) + ' Q' + (x - 15) + ',' + y + ' ' + (x - 3) + ',' + (y + 14), { c: c, w: 2.4 }) +
      F.path('M' + (x + 3) + ',' + (y - 14) + ' Q' + (x + 15) + ',' + y + ' ' + (x + 3) + ',' + (y + 14), { c: c, w: 2.4 }) +
      (lbl ? t(x, o.below ? y + 27 : y - 27, lbl, { a: 'm', size: o.size || 14, b: 1, c: c }) : '');
  }
  /* 래더 명령 상자 [TON …] — 왼쪽 끝 x, 폭 bw */
  function lbox(x, y, bw, txt, o) {
    o = o || {};
    return box(x, y - 16, bw, 32, { fill: o.fill || C.paper, c: o.c || C.ink, w: 1.8, r: 3 }) +
      t(x + bw / 2, y + 0.5, txt, { a: 'm', size: o.size || 14, b: 1, halo: false, c: o.c || C.ink });
  }
  function bus(x, y1, y2, c) { return line(x, y1, x, y2, { c: c || C.ink, w: 3.4 }); }
  /* 신호 파형 — [x, 높음?] 목록을 계단선으로 */
  function wave(xs, lo, hi, x0, x1, o) {
    o = o || {};
    var pts = [[x0, lo]], lvl = lo;
    xs.forEach(function (x) { pts.push([x, lvl]); lvl = lvl === lo ? hi : lo; pts.push([x, lvl]); });
    pts.push([x1, lvl]);
    return F.poly(pts, { c: o.c || C.ink, w: o.w || 2.4 });
  }

  return {

  /* ─────────── 1 · 제어반 배선 ─────────── */
  'seq-fb': { stage: [1], cards: ['시퀀스 제어 — 정해진 순서대로 간다'],
    cap: '시퀀스는 조건이 맞으면 다음 순서로, 피드백은 결과를 되먹여 목표와 비교한다',
    draw: function () {
      var s = t(120, 28, '시퀀스 제어', { a: 'm', b: 1, size: 17, c: C.blue }) +
        t(360, 28, '피드백(서보) 제어', { a: 'm', b: 1, size: 17, c: C.green }) + divider(240, 16, 244);
      var st = ['급수', '세탁', '탈수'], cond = ['물이 다 차면', '세탁이 끝나면'];
      for (var i = 0; i < 3; i++) {
        var y = 52 + i * 68;
        s += box(62, y, 116, 40, { fill: C.blueL, c: C.blue, label: st[i] }) + F.num(62, y, i + 1, { c: C.blue });
        if (i < 2) s += arrow(120, y + 42, 120, y + 66, { c: C.blue, w: 2, head: 9 }) + t(130, y + 54, cond[i], { size: 13, c: C.sub });
      }
      s += t(120, 244, '세탁기 · 신호등 · 컨베이어', { a: 'm', size: 13, c: C.sub });
      /* 피드백 고리 */
      s += t(340, 56, '목표값', { a: 'm', b: 1 }) + arrow(340, 68, 340, 88, { w: 2, head: 9 });
      s += box(290, 90, 100, 36, { fill: C.greenL, c: C.green, label: '비교' });
      s += arrow(340, 126, 340, 146, { w: 2, head: 9 });
      s += box(290, 148, 100, 36, { fill: C.greenL, c: C.green, label: '제어 (히터)' });
      s += arrow(340, 184, 340, 204, { w: 2, head: 9 }) + t(340, 218, '결과 (온도)', { a: 'm', b: 1 });
      s += F.route([[392, 218], [448, 218], [448, 108], [393, 108]], { c: C.green, w: 2, head: 10 });
      s += t(442, 164, '되먹임', { a: 'e', size: 14, b: 1, c: C.green });
      s += t(360, 244, '온도 · 위치 · 속도 제어', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 262, s);
    } },

  'sym-contact': { stage: [1], cards: ['전기 기호 — 이 여덟 개면 도면이 읽힌다'],
    cap: '접점 기호 — 힘을 주지 않은 평소 상태로 그린다 (a는 떨어진 접점, b는 붙은 접점 + 사선)',
    draw: function () {
      var cx = [85, 240, 395], cy = [74, 190], s = '';
      var it = [
        ['a', {}, 'a접점 (NO)'], ['b', {}, 'b접점 (NC)'], ['a', { timer: 1 }, '한시 접점 (TR)'],
        ['a', { push: 1 }, '기동 버튼 (a)'], ['b', { push: 1 }, '정지 버튼 (b)'], ['a', { limit: 1 }, '리밋 스위치 (LS)']];
      for (var i = 0; i < 6; i++) {
        var x = cx[i % 3], y = cy[Math.floor(i / 3)];
        s += w(x - 58, y, x - 18) + w(x + 18, y, x + 58) + sc(it[i][0], x, y, it[i][1]);
        s += t(x, y + 32, it[i][2], { a: 'm', b: 1, size: 15, ans: 1 });
      }
      s += line(16, 130, 464, 130, { c: C.edge, w: 1.4 });
      return F.svg(480, 244, s);
    } },

  'sym-device': { stage: [1], cards: ['전기 기호 — 이 여덟 개면 도면이 읽힌다'],
    cap: '기기 기호 — 코일은 원, 표시등은 원 + X, 과부하계전기는 히터(물결), 전동기는 M 3~',
    draw: function () {
      var s = '', r1 = [62, 178, 302, 418], r2 = [100, 240, 380], y1 = 66, y2 = 176;
      function wires(x, y, a, b) { return w(x - 48, y, x - a) + w(x + b, y, x + 48); }
      /* 1줄 */
      s += wires(r1[0], y1, 16, 16) + coil(r1[0], y1, '') + t(r1[0], y1 + 34, '릴레이 코일', { a: 'm', b: 1, size: 15, ans: 1 });
      s += wires(r1[1], y1, 18, 18) + coil(r1[1], y1, 'MC', { r: 18 }) + t(r1[1], y1 + 34, '전자접촉기', { a: 'm', b: 1, size: 15, ans: 1 });
      s += wires(r1[2], y1, 20, 20) + box(r1[2] - 20, y1 - 14, 40, 28, { fill: C.paper, c: C.ink, w: 2.2, r: 2 }) +
        F.path('M' + (r1[2] - 17) + ',' + y1 + ' q6,-8 11,0 q6,8 11,0 q6,-8 12,0', { w: 1.8 }) +
        t(r1[2], y1 + 34, '과부하계전기', { a: 'm', b: 1, size: 15, ans: 1 }) + t(r1[2], y1 + 54, 'EOCR · THR', { a: 'm', size: 13, c: C.sub });
      s += wires(r1[3], y1, 15, 15) + lamp(r1[3], y1) + t(r1[3], y1 + 34, '표시등 (PL)', { a: 'm', b: 1, size: 15, ans: 1 });
      /* 2줄 */
      var bx = r2[0], by = y2 + 8;
      s += w(bx - 48, by, bx - 18) + w(bx + 18, by, bx + 48) +
        F.path('M' + (bx - 18) + ',' + by + ' A18,18 0 0 1 ' + (bx + 18) + ',' + by + ' Z', { fill: C.paper, w: 2.2 }) +
        t(bx, y2 + 34, '부저 (BZ)', { a: 'm', b: 1, size: 15, ans: 1 });
      s += wires(r2[1], y2, 20, 20) + F.poly([[r2[1], y2 - 18], [r2[1] + 20, y2], [r2[1], y2 + 18], [r2[1] - 20, y2]], { close: 1, fill: C.paper, w: 2.2 }) +
        t(r2[1], y2 + 34, '근접센서', { a: 'm', b: 1, size: 15, ans: 1 });
      s += wires(r2[2], y2, 20, 20) + F.circle(r2[2], y2, 20, { fill: C.paper, w: 2.2 }) +
        t(r2[2], y2 - 5, 'M', { a: 'm', b: 1, size: 16, halo: false }) + t(r2[2], y2 + 10, '3~', { a: 'm', size: 13, halo: false }) +
        t(r2[2], y2 + 38, '3상 유도전동기', { a: 'm', b: 1, size: 15, ans: 1 });
      s += line(16, 136, 464, 136, { c: C.edge, w: 1.4 });
      return F.svg(480, 236, s);
    } },

  ab: { stage: [1, 2], cards: ['a접점과 b접점 — 평소 상태가 다르다'],
    cap: 'a접점은 누르면 닫혀 켜지고, b접점은 누르면 열려 꺼진다',
    draw: function () {
      var s = t(185, 26, '평소 (손 안 댐)', { a: 'm', b: 1 }) + t(385, 26, '눌렀을 때', { a: 'm', b: 1, c: C.orange });
      s += t(46, 96, 'a접점', { a: 'm', b: 1, size: 17, c: C.blue }) + t(46, 118, 'NO', { a: 'm', size: 13, c: C.sub });
      s += t(46, 206, 'b접점', { a: 'm', b: 1, size: 17, c: C.red }) + t(46, 228, 'NC', { a: 'm', size: 13, c: C.sub });
      s += line(92, 148, 470, 148, { c: C.edge, w: 1.4 }) + line(285, 40, 285, 250, { c: C.edge, w: 1.4 });
      function cell(cx, y, type, pressed) {
        var on = type === 'a' ? pressed : !pressed, c = on ? C.green : C.ink, o = '';
        o += w(cx - 84, y, cx - 58, c) + sc(type, cx - 40, y, { push: 1, closed: on, c: c }) + w(cx - 22, y, cx + 24, c) +
          lamp(cx + 40, y, { on: on, c: on ? C.orange : C.ink }) + w(cx + 55, y, cx + 84, c);
        if (pressed) o += arrow(cx - 39, y - 56, cx - 39, y - 36, { c: C.orange, w: 1.8, head: 8 });
        o += t(cx, y + 36, on ? '켜짐' : '꺼짐', { a: 'm', b: 1, size: 15, c: on ? C.green : C.sub });
        return o;
      }
      s += cell(185, 96, 'a', 0) + cell(385, 96, 'a', 1) + cell(185, 206, 'b', 0) + cell(385, 206, 'b', 1);
      return F.svg(480, 262, s);
    } },

  failsafe: { stage: [1], cards: ['a접점과 b접점 — 평소 상태가 다르다'],
    cap: '정지 버튼을 b접점으로 — 선이 끊어져도 멈추는 쪽으로 고장 난다(페일세이프)',
    draw: function () {
      var s = t(120, 26, 'b접점 정지 — 올바름', { a: 'm', b: 1, c: C.green }) + t(360, 26, 'a접점 정지 — 위험', { a: 'm', b: 1, c: C.red }) +
        divider(240, 14, 208);
      /* 왼쪽: 전원 - 정지(b) - 단선 - MC */
      var y = 96;
      s += w(18, y, 50) + sc('b', 68, y, { push: 1 }) + w(86, y, 116) + cut(124, y) + w(132, y, 164) + coil(182, y, 'MC') + w(198, y, 226);
      s += t(68, y - 44, '정지', { a: 'm', size: 13, b: 1 }) + t(124, y + 22, '단선', { a: 'm', size: 13, c: C.red, b: 1 });
      s += t(120, 150, '선이 끊어지면', { a: 'm', size: 14, c: C.sub }) + t(120, 174, 'MC 가 바로 꺼진다', { a: 'm', b: 1, c: C.green }) +
        t(120, 198, '→ 멈춘다 (안전)', { a: 'm', b: 1, c: C.green });
      /* 오른쪽: 정지(a) - 단선 - 정지 릴레이 */
      s += w(258, y, 290) + sc('a', 308, y, { push: 1 }) + w(326, y, 356) + cut(364, y) + w(372, y, 404) + coil(422, y, '정지', { size: 12 }) + w(438, y, 466);
      s += t(308, y - 44, '정지', { a: 'm', size: 13, b: 1 }) + t(364, y + 22, '단선', { a: 'm', size: 13, c: C.red, b: 1 });
      s += t(360, 150, '선이 끊어지면', { a: 'm', size: 14, c: C.sub }) + t(360, 174, '눌러도 신호가 안 간다', { a: 'm', b: 1, c: C.red }) +
        t(360, 198, '→ 못 멈춘다 (위험)', { a: 'm', b: 1, c: C.red });
      s += t(240, 236, '고장 나도 안전한 쪽으로 — 비상정지 · 정지 · EOCR 은 b접점', { a: 'm', b: 1, size: 14 });
      return F.svg(480, 256, s);
    } },

  /* ─────────── 2 · 회로 실습 ─────────── */
  'and-or': { stage: [2, 4], cards: ['AND 는 직렬, OR 는 병렬'],
    cap: 'AND 는 직렬(둘 다), OR 는 병렬(하나만), NOT 은 b접점(누르면 꺼짐)',
    draw: function () {
      var s = '';
      /* AND */
      var y = 64;
      s += t(40, y - 4, 'AND', { a: 'm', b: 1, size: 17, c: C.blue }) + t(40, y + 18, '직렬', { a: 'm', size: 13, c: C.sub });
      s += w(80, y, 127) + sc('a', 145, y) + w(163, y, 207) + sc('a', 225, y) + w(243, y, 315) + lamp(330, y) + w(345, y, 358);
      s += t(145, y - 30, 'PB1', { a: 'm', size: 13, b: 1 }) + t(225, y - 30, 'PB2', { a: 'm', size: 13, b: 1 });
      s += t(372, y - 10, '둘 다 눌러야', { size: 14 }) + t(372, y + 10, '켜진다', { size: 14, b: 1, c: C.blue });
      /* OR */
      var y1 = 140, y2 = 180;
      s += t(40, y1 + 14, 'OR', { a: 'm', b: 1, size: 17, c: C.green }) + t(40, y1 + 36, '병렬', { a: 'm', size: 13, c: C.sub });
      s += w(80, y1, 110) + w(110, y1, 167) + sc('a', 185, y1) + w(203, y1, 260) +
        w(110, y1, 110, y2) + w(110, y2, 167) + sc('a', 185, y2) + w(203, y2, 260) + w(260, y2, 260, y1) +
        w(260, y1, 315) + lamp(330, y1) + w(345, y1, 358) + dot(110, y1, 3.2) + dot(260, y1, 3.2);
      s += t(185, y1 - 30, 'PB1', { a: 'm', size: 13, b: 1 }) + t(185, y2 + 20, 'PB2', { a: 'm', size: 13, b: 1 });
      s += t(372, y1 - 10, '하나만 눌러도', { size: 14 }) + t(372, y1 + 10, '켜진다', { size: 14, b: 1, c: C.green });
      /* NOT */
      var y3 = 262;
      s += t(40, y3 - 4, 'NOT', { a: 'm', b: 1, size: 17, c: C.red }) + t(40, y3 + 18, 'b접점', { a: 'm', size: 13, c: C.sub });
      s += w(80, y3, 167) + sc('b', 185, y3) + w(203, y3, 315) + lamp(330, y3) + w(345, y3, 358);
      s += t(185, y3 - 30, 'PB1', { a: 'm', size: 13, b: 1 });
      s += t(372, y3 - 10, '누르면', { size: 14 }) + t(372, y3 + 10, '꺼진다', { size: 14, b: 1, c: C.red });
      s += line(16, 104, 464, 104, { c: C.edge, w: 1.4 }) + line(16, 214, 464, 214, { c: C.edge, w: 1.4 });
      return F.svg(480, 292, s);
    } },

  valve52: { stage: [2], cards: ['전자밸브 — 전기로 공기 길을 바꾼다'],
    cap: '5포트 2위치 편솔 밸브 — 네모 칸 수가 위치 수, 드나드는 구멍 수가 포트 수 (파일럿 포트는 세지 않는다)',
    draw: function () {
      var s = t(240, 24, '5포트 2위치 편솔 밸브', { a: 'm', b: 1, size: 17 });
      /* 칸 두 개 */
      s += box(160, 80, 70, 70, { fill: C.paper, c: C.ink, w: 2.2, r: 0 }) + box(230, 80, 70, 70, { fill: C.blueL, c: C.ink, w: 2.2, r: 0 });
      /* 오른쪽 칸(평소) — 공급 → 출력, 출력 → 배기, 한 배기는 막힘 */
      s += arrow(265, 148, 284, 83, { w: 1.8, head: 9 }) + arrow(245, 82, 240, 147, { w: 1.8, head: 9 });
      s += line(290, 150, 290, 138, { w: 1.8 }) + line(283, 138, 297, 138, { w: 1.8 });
      /* 왼쪽 칸(여자) */
      s += arrow(195, 148, 176, 83, { w: 1.8, head: 9 }) + arrow(215, 82, 220, 147, { w: 1.8, head: 9 });
      s += line(170, 150, 170, 138, { w: 1.8 }) + line(163, 138, 177, 138, { w: 1.8 });
      /* 포트(바깥 선은 평소 칸에만) */
      s += line(245, 80, 245, 60, { w: 2 }) + line(285, 80, 285, 60, { w: 2 });
      s += line(240, 150, 240, 172, { w: 2 }) + line(265, 150, 265, 172, { w: 2 }) + line(290, 150, 290, 172, { w: 2 });
      /* 솔레노이드 · 스프링 */
      s += box(124, 97, 36, 36, { fill: C.paper, c: C.ink, w: 2, r: 0 }) + line(127, 130, 157, 100, { w: 2 });
      s += F.poly([[300, 115], [306, 103], [314, 127], [322, 103], [330, 127], [336, 115], [344, 115]], { w: 2 });
      s += t(265, 46, '출력 ×2', { a: 'm', size: 14 }) + t(265, 188, '공급 1 · 배기 2', { a: 'm', size: 14 });
      s += t(142, 162, '솔레노이드', { a: 'm', size: 14, b: 1, c: C.blue }) + t(322, 88, '스프링', { a: 'm', size: 14, b: 1 });
      s += t(195, 66, '전기 ON', { a: 'm', size: 13, c: C.blue, b: 1 }) + t(334, 150, '평소', { a: 'm', size: 13, c: C.sub, b: 1 });
      s += t(240, 222, '칸 2개 = 2위치 · 구멍 5개 = 5포트', { a: 'm', b: 1, size: 15 });
      s += t(240, 246, '빗금 네모 = 솔레노이드 · 지그재그 = 복귀 스프링', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 262, s);
    } },

  'sol-single-double': { stage: [2], cards: ['전자밸브 — 전기로 공기 길을 바꾼다'],
    cap: '편솔은 전기가 끊기면 스프링이 초기 위치로 되돌리고, 양솔은 마지막 위치를 기억한다',
    draw: function () {
      function mv(cx, y, dbl, act) {
        var x0 = cx - 64, o = '';
        o += box(x0, y + 6, 24, 28, { fill: C.paper, c: C.ink, w: 1.8, r: 0 }) + line(x0 + 2, y + 32, x0 + 22, y + 8, { w: 1.6 });
        o += box(x0 + 24, y, 40, 40, { fill: act === 1 ? C.orangeL : C.paper, c: C.ink, w: 2, r: 0 });
        o += box(x0 + 64, y, 40, 40, { fill: act === 2 ? C.blueL : C.paper, c: C.ink, w: 2, r: 0 });
        o += arrow(x0 + 34, y + 36, x0 + 54, y + 5, { w: 1.5, head: 7 }) + arrow(x0 + 84, y + 36, x0 + 84, y + 5, { w: 1.5, head: 7 });
        if (dbl) o += box(x0 + 104, y + 6, 24, 28, { fill: C.paper, c: C.ink, w: 1.8, r: 0 }) + line(x0 + 106, y + 32, x0 + 126, y + 8, { w: 1.6 });
        else o += F.poly([[x0 + 104, y + 20], [x0 + 108, y + 10], [x0 + 113, y + 30], [x0 + 118, y + 10], [x0 + 123, y + 30], [x0 + 128, y + 20]], { w: 1.6 });
        return o;
      }
      var s = t(120, 26, '편솔', { a: 'm', b: 1, size: 17, c: C.blue }) + t(120, 48, '솔레노이드 1 + 스프링', { a: 'm', size: 13, c: C.sub }) +
        t(360, 26, '양솔', { a: 'm', b: 1, size: 17, c: C.orange }) + t(360, 48, '솔레노이드 2', { a: 'm', size: 13, c: C.sub }) +
        divider(240, 14, 184);
      s += mv(120, 70, 0, 2) + mv(360, 70, 1, 1);
      s += t(120, 136, '전기가 끊기면', { a: 'm', size: 14 }) + t(120, 160, '스프링 쪽 칸으로 복귀', { a: 'm', b: 1, c: C.blue });
      s += t(360, 136, '전기가 끊기면', { a: 'm', size: 14 }) + t(360, 160, '마지막 칸 그대로', { a: 'm', b: 1, c: C.orange });
      s += t(240, 206, '정전 때 반드시 원위치로 가야 하면 → 편솔', { a: 'm', b: 1, size: 15 });
      return F.svg(480, 226, s);
    } },

  /* ─────────── 3 · 자기유지 · 정역 ─────────── */
  'self-hold': { stage: [3], cards: ['손을 떼도 계속 돌게 — 자기유지'],
    cap: '자기유지 — 버튼에서 손을 떼도 MC 자기 a접점이 전기를 물고 있다',
    draw: function () {
      var G = C.green, y = 86, y2 = 152, s = bus(24, 48, 176) + bus(456, 48, 176);
      /* 전기가 흐르는 길(초록) — 손을 뗀 뒤 */
      s += w(24, y, 70, G, 1) + w(70, y, 70, y2, G, 1) + w(70, y2, 88, G, 1) + sc('a', 106, y2, { closed: true, c: G }) +
        w(124, y2, 150, G, 1) + w(150, y2, 150, y, G, 1) + w(150, y, 172, G, 1) + sc('b', 190, y, { push: 1, c: G }) +
        w(208, y, 244, G, 1) + sc('b', 262, y, { c: G }) + w(280, y, 364, G, 1) + coil(382, y, 'MC', { on: 1, r: 18 }) + w(400, y, 456, G, 1);
      /* 손을 뗀 기동 버튼 */
      s += w(70, y, 88) + sc('a', 106, y, { push: 1 }) + w(124, y, 150) + dot(70, y, 3.2) + dot(150, y, 3.2, G);
      s += t(106, y - 44, 'PB-ON', { a: 'm', size: 13, b: 1 }) + t(190, y - 44, 'PB-OFF', { a: 'm', size: 13, b: 1, c: C.red }) +
        t(262, y - 30, 'EOCR', { a: 'm', size: 13, b: 1, c: C.red });
      s += t(106, y2 + 24, 'MC a접점', { a: 'm', size: 13, b: 1, c: G });
      s += t(330, 128, 'b접점 — 누르거나 과부하면 끊김', { a: 'm', size: 13, c: C.red });
      s += F.num(34, 210, 1, { c: C.blue }) + t(52, 210, 'PB-ON 을 누르면 MC 가 켜진다', { size: 14 });
      s += F.num(34, 238, 2, { c: G }) + t(52, 238, 'MC a접점이 닫혀 전기를 물고 있다 → 손을 떼도 유지', { size: 14, b: 1, c: G });
      return F.svg(480, 258, s);
    } },

  interlock: { stage: [3], cards: ['인터록 — 둘이 동시에 켜지면 큰일 난다'],
    cap: '인터록 — MC1 이 켜지면 역회전 줄의 MC1 b접점이 열려 MC2 는 켜질 수 없다',
    draw: function () {
      var G = C.green, y1 = 84, y2 = 176, s = bus(24, 44, 206) + bus(456, 44, 206);
      s += w(24, y1, 86, G, 1) + sc('a', 104, y1, { push: 1, closed: true, c: G }) + w(122, y1, 200, G, 1) + sc('b', 218, y1, { c: G }) +
        w(236, y1, 364, G, 1) + coil(382, y1, 'MC1', { on: 1, r: 18, size: 12 }) + w(400, y1, 456, G, 1);
      s += w(24, y2, 86) + sc('a', 104, y2, { push: 1 }) + w(122, y2, 200) + sc('b', 218, y2, { closed: false, c: C.red }) +
        w(236, y2, 364) + coil(382, y2, 'MC2', { r: 18, size: 12 }) + w(400, y2, 456);
      s += t(104, y1 - 44, '정회전 PB', { a: 'm', size: 13, b: 1 }) + t(218, y1 - 30, 'MC2 b접점', { a: 'm', size: 13, b: 1 });
      s += t(104, y2 + 26, '역회전 PB', { a: 'm', size: 13, b: 1 }) + t(218, y2 + 26, 'MC1 b접점', { a: 'm', size: 13, b: 1, c: C.red });
      s += t(382, y1 - 32, '정회전 ON', { a: 'm', size: 13, b: 1, c: G }) + t(382, y2 + 30, '못 켜짐', { a: 'm', size: 13, b: 1, c: C.red });
      s += F.poly([[382, 104], [382, 132], [226, 132], [226, 160]], { c: C.orange, w: 1.6, dash: '5 4' });
      s += t(304, 120, 'MC1 이 켜지면 이 접점이 열린다', { a: 'm', size: 13, b: 1, c: C.orange });
      s += t(240, 238, '서로 상대의 b접점을 직렬로 — 동시에 켜질 수 없다', { a: 'm', b: 1, size: 14 });
      return F.svg(480, 256, s);
    } },

  'fwd-rev': { stage: [3, 5], cards: ['손을 떼도 계속 돌게 — 자기유지'],
    cap: '정역 운전 주회로 — MC2 쪽에서 3상 중 두 선(R·T)을 바꿔 넣으면 반대로 돈다',
    draw: function () {
      var s = '', ph = [['R', 46], ['S', 62], ['T', 78]], out = [178, 194, 210];
      ph.forEach(function (p) { s += line(44, p[1], 380, p[1], { w: 2.2 }) + t(32, p[1], p[0], { a: 'm', b: 1, size: 14, c: C.red }); });
      out.forEach(function (y, i) { s += line(110, y, 406, y, { w: 2.2 }) + t(98, y, ['U', 'V', 'W'][i], { a: 'm', size: 13, b: 1 }); });
      /* MC1 — 그대로 */
      [110, 130, 150].forEach(function (x, i) {
        s += line(x, ph[i][1], x, 100, { w: 2.2 }) + dot(x, ph[i][1], 3.2) + vc(x, 100) + line(x, 134, x, out[i], { w: 2.2 }) + dot(x, out[i], 3.2);
      });
      s += t(168, 112, 'MC1', { b: 1 }) + t(168, 132, '정회전', { size: 13, c: C.sub });
      /* MC2 — R 과 T 를 바꿈 */
      [300, 320, 340].forEach(function (x, i) { s += line(x, ph[i][1], x, 100, { w: 2.2 }) + dot(x, ph[i][1], 3.2) + vc(x, 100, i === 1 ? C.ink : C.red); });
      s += F.poly([[300, 134], [340, 160], [340, 210]], { c: C.red, w: 2.4 }) + F.poly([[340, 134], [300, 160], [300, 178]], { c: C.red, w: 2.4 }) +
        line(320, 134, 320, 194, { w: 2.2 }) + dot(300, 178, 3.2, C.red) + dot(320, 194, 3.2) + dot(340, 210, 3.2, C.red);
      s += t(358, 112, 'MC2', { b: 1, c: C.red }) + t(358, 132, '역회전', { size: 13, c: C.sub });
      s += t(292, 150, 'R↔T', { a: 'e', size: 14, b: 1, c: C.red });
      /* 전동기 */
      s += line(406, 178, 422, 184, { w: 2.2 }) + line(406, 194, 420, 194, { w: 2.2 }) + line(406, 210, 422, 204, { w: 2.2 });
      s += F.circle(442, 194, 22, { fill: C.paper, w: 2.2 }) + t(442, 188, 'M', { a: 'm', b: 1, halo: false }) + t(442, 204, '3~', { a: 'm', size: 13, halo: false });
      s += t(240, 244, '두 선을 바꾸면 반대로 · 세 선을 다 바꾸면 그대로', { a: 'm', b: 1, size: 14 });
      return F.svg(480, 262, s);
    } },

  /* ─────────── 4 · 래더 · PLC ─────────── */
  'ladder-read': { stage: [4], cards: ['래더 다이어그램 — 왼쪽에서 오른쪽으로 읽는다'],
    cap: '래더는 왼쪽 모선 → 접점 → 코일(오른쪽 끝) 순서로, 한 줄(렁)씩 위에서 아래로 실행한다',
    draw: function () {
      var y1 = 100, y2 = 170, s = bus(44, 60, 196) + bus(436, 60, 196);
      s += t(44, 48, '왼쪽 모선', { a: 'm', size: 13, c: C.sub }) + t(436, 48, '오른쪽 모선', { a: 'm', size: 13, c: C.sub });
      s += w(44, y1, 124) + la(130, y1, 'X0') + w(136, y1, 204) + la(210, y1, 'X1', { b: 1 }) + w(216, y1, 371) + lc(380, y1, 'Y0') + w(389, y1, 436);
      s += w(44, y2, 124) + la(130, y2, 'X2') + w(136, y2, 371) + lc(380, y2, 'Y1') + w(389, y2, 436);
      s += F.num(20, y1, 1, { c: C.blue, r: 10, size: 12 }) + F.num(20, y2, 2, { c: C.blue, r: 10, size: 12 });
      s += t(130, y1 + 26, '접점', { a: 'm', size: 13, c: C.sub }) + t(380, y1 + 26, '코일', { a: 'm', size: 13, c: C.sub });
      s += arrow(150, 22, 310, 22, { c: C.blue, w: 1.8, head: 9 }) + t(320, 22, '왼 → 오', { size: 14, b: 1, c: C.blue });
      s += arrow(458, 80, 458, 186, { c: C.blue, w: 1.8, head: 9 }) + t(476, 206, '위 → 아래', { a: 'e', size: 13, b: 1, c: C.blue });
      s += t(240, 228, '접점은 왼쪽 · 코일은 오른쪽 끝', { a: 'm', b: 1, size: 15, c: C.orange });
      return F.svg(480, 248, s);
    } },

  'relay-ladder': { stage: [4], cards: ['래더 다이어그램 — 왼쪽에서 오른쪽으로 읽는다'],
    cap: '릴레이 자기유지 회로를 그대로 래더로 옮긴다 — PB-ON→X0 · PB-OFF→X1 · MC→Y0',
    draw: function () {
      var y = 90, yh = 150, s = t(118, 24, '릴레이 회로', { a: 'm', b: 1, size: 15 }) + t(362, 24, '래더 (PLC)', { a: 'm', b: 1, size: 15, c: C.blue });
      /* 왼쪽 — 유접점 */
      s += bus(14, 62, 170) + bus(226, 62, 170);
      s += w(14, y, 36) + sc('a', 50, y, { push: 1, hw: 14 }) + w(64, y, 98) + sc('b', 112, y, { push: 1, hw: 14 }) + w(126, y, 170) + coil(186, y, 'MC', { r: 15, size: 12 }) + w(201, y, 226);
      s += w(24, y, 24, yh) + w(24, yh, 36) + sc('a', 50, yh, { hw: 14 }) + w(64, yh, 80) + w(80, yh, 80, y) + dot(24, y, 3) + dot(80, y, 3);
      s += t(50, y - 44, 'PB-ON', { a: 'm', size: 13, b: 1 }) + t(114, y - 44, 'PB-OFF', { a: 'm', size: 13, b: 1 }) + t(50, yh + 22, 'MC', { a: 'm', size: 13, b: 1 });
      /* 오른쪽 — 래더 */
      s += bus(258, 62, 170) + bus(466, 62, 170);
      s += w(258, y, 294) + la(300, y, 'X0') + w(306, y, 354) + la(360, y, 'X1', { b: 1 }) + w(366, y, 421) + lc(430, y, 'Y0') + w(439, y, 466);
      s += w(276, y, 276, yh) + w(276, yh, 294) + la(300, yh, 'Y0', { below: 1 }) + w(306, yh, 326) + w(326, yh, 326, y) + dot(276, y, 3) + dot(326, y, 3);
      s += t(240, 218, 'PB-ON → X0 · PB-OFF → X1 · MC → Y0', { a: 'm', size: 14, b: 1 });
      s += t(240, 242, '같은 자기유지 — 모양이 그대로 옮겨진다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 258, s);
    } },

  'timer-chart': { stage: [4, 8], cards: ['타이머 — 켜짐 지연과 꺼짐 지연'],
    cap: 'TON 은 켜지고 t 뒤에 켜지고, TOFF 는 꺼지고 t 뒤에 꺼진다 (t = 설정 시간)',
    draw: function () {
      var s = divider(190, 36, 226) + divider(330, 36, 226);
      s += t(190, 24, '입력 켜짐', { a: 'm', size: 13, c: C.sub }) + t(330, 24, '입력 꺼짐', { a: 'm', size: 13, c: C.sub });
      s += t(20, 60, '입력', { b: 1 });
      s += wave([190, 330], 72, 46, 140, 452);
      s += t(20, 126, 'TON', { b: 1, c: C.blue }) + t(20, 146, '켜짐 지연', { size: 13, c: C.sub });
      s += wave([260, 330], 140, 114, 140, 452, { c: C.blue });
      s += F.dim(190, 154, 260, 154, 't', { c: C.blue, side: -1 });
      s += t(20, 194, 'TOFF', { b: 1, c: C.green }) + t(20, 214, '꺼짐 지연', { size: 13, c: C.sub });
      s += wave([190, 400], 208, 182, 140, 452, { c: C.green });
      s += F.dim(330, 222, 400, 222, 't', { c: C.green, side: -1 });
      s += t(240, 252, '입력이 t 전에 끊기면 현재값은 0 으로 — 처음부터 다시 센다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 266, s);
    } },

  'ctu-chart': { stage: [4, 7, 8], cards: ['타이머 — 켜짐 지연과 꺼짐 지연'],
    cap: '카운터(CTU) — 입력이 들어올 때마다 1씩 세고, 설정값(예: 5)에 닿으면 접점 ON · 리셋하면 0',
    draw: function () {
      var s = '', xs = [160, 200, 240, 280, 320], pts = [];
      xs.forEach(function (x) { pts.push(x, x + 16); });
      s += t(16, 54, '센서 입력', { b: 1, size: 15 }) + wave(pts, 64, 42, 136, 462);
      s += t(16, 96, '현재값', { size: 14, c: C.sub });
      xs.forEach(function (x, i) { s += t(x + 8, 96, String(i + 1), { a: 'm', b: 1, size: 15, c: i === 4 ? C.blue : C.ink }); });
      s += t(436, 96, '0', { a: 'm', b: 1, size: 15, c: C.red });
      s += t(16, 140, 'C 접점', { b: 1, size: 15, c: C.blue }) + wave([320, 400], 150, 126, 136, 462, { c: C.blue });
      s += t(360, 116, '5 에 닿음', { a: 'm', size: 13, b: 1, c: C.blue });
      s += t(16, 198, '리셋', { b: 1, size: 15, c: C.red }) + wave([400, 416], 208, 186, 136, 462, { c: C.red });
      s += divider(320, 30, 214) + divider(400, 30, 214);
      s += t(240, 238, '시간(T)이 아니라 횟수(C)를 센다', { a: 'm', b: 1, size: 15 });
      return F.svg(480, 256, s);
    } },

  /* ─────────── 5 · 주회로 배선 ─────────── */
  'main-ctrl': { stage: [5], cards: ['제어회로와 주회로는 다른 길이다'],
    cap: '주회로는 모터로 가는 큰 전류(굵은 선), 제어회로는 MC 코일만 켜고 끄는 작은 신호(가는 선)',
    draw: function () {
      var R = C.red, s = t(110, 24, '주회로 (동력)', { a: 'm', b: 1, size: 16, c: R }) + t(352, 24, '제어회로 (신호)', { a: 'm', b: 1, size: 16, c: C.blue });
      var xs = [70, 110, 150];
      xs.forEach(function (x, i) {
        s += t(x, 44, ['R', 'S', 'T'][i], { a: 'm', b: 1, size: 14, c: R });
        s += line(x, 54, x, 76, { c: R, w: 3 }) + line(x, 100, x, 118, { c: R, w: 3 }) + vc(x, 118) + line(x, 152, x, 172, { c: R, w: 3 }) +
          line(x, 196, x, 206, { c: R, w: 3 }) + line(x, 206, 110 + (x - 110) * 0.35, 220, { c: R, w: 3 });
      });
      s += box(48, 76, 124, 24, { fill: C.redL, c: R, label: 'MCCB', size: 14 });
      s += box(48, 172, 124, 24, { fill: C.redL, c: R }) + F.path('M58,184 q6,-8 12,0 q6,8 12,0 q6,-8 12,0', { w: 1.6 }) + t(132, 184, 'EOCR', { a: 'm', b: 1, size: 14, halo: false });
      s += t(56, 135, 'MC', { a: 'e', b: 1, size: 14 });
      s += F.circle(110, 240, 22, { fill: C.paper, c: R, w: 2.4 }) + t(110, 234, 'M', { a: 'm', b: 1, halo: false }) + t(110, 250, '3~', { a: 'm', size: 13, halo: false });
      s += t(110, 282, '3상 380V · 굵은 선', { a: 'm', size: 13, c: C.sub });
      /* 제어회로 */
      var y = 92, yh = 146, K = { c: C.ink };
      s += line(240, 54, 240, 186, { w: 2 }) + line(466, 54, 466, 186, { w: 2 });
      s += w(240, y, 258) + sc('a', 272, y, { push: 1, hw: 14 }) + w(286, y, 318) + sc('b', 332, y, { push: 1, hw: 14 }) + w(346, y, 374) +
        sc('b', 388, y, { hw: 14 }) + w(402, y, 424) + coil(440, y, 'MC', { r: 15, size: 12, c: C.blue }) + w(455, y, 466);
      s += w(250, y, 250, yh) + w(250, yh, 258) + sc('a', 272, yh, { hw: 14 }) + w(286, yh, 300) + w(300, yh, 300, y) + dot(250, y, 3) + dot(300, y, 3);
      s += t(272, 50, 'PB-ON', { a: 'm', size: 13, b: 1 }) + t(332, 50, 'PB-OFF', { a: 'm', size: 13, b: 1 }) + t(388, 64, 'EOCR', { a: 'm', size: 13, b: 1 }) +
        t(272, yh + 22, 'MC', { a: 'm', size: 13, b: 1 });
      s += t(352, 204, '단상 220V 또는 DC 24V · 가는 선', { a: 'm', size: 13, c: C.sub });
      /* MC 코일 → 주접점 */
      s += F.route([[440, 110], [440, 232], [196, 232], [196, 135], [166, 135]], { c: C.orange, w: 1.6, dash: '5 4', head: 9 });
      s += t(318, 252, 'MC 코일이 켜지면 주접점이 닫힌다', { a: 'm', size: 13, b: 1, c: C.orange });
      return F.svg(480, 298, s);
    } },

  /* ─────────── 6 · PLC 기본 ─────────── */
  scan: { stage: [6], cards: ['PLC 속은 이렇게 돌아간다 — 스캔'],
    cap: 'PLC 는 입력 읽기 → 연산 → 출력 갱신을 쉬지 않고 되풀이한다 (한 바퀴 = 1 스캔)',
    draw: function () {
      var s = '', xs = [20, 175, 330], a = ['입력 읽기', '연산', '출력 갱신'], b = ['한꺼번에 저장', '위 → 아래로 실행', '결과를 한꺼번에'];
      for (var i = 0; i < 3; i++) {
        s += box(xs[i], 60, 130, 62, { fill: C.blueL, c: C.blue }) + F.num(xs[i] + 4, 60, i + 1, { c: C.blue }) +
          t(xs[i] + 65, 83, a[i], { a: 'm', b: 1, halo: false }) + t(xs[i] + 65, 106, b[i], { a: 'm', size: 13, c: C.sub, halo: false });
      }
      s += arrow(151, 91, 173, 91, { w: 2, head: 9 }) + arrow(306, 91, 328, 91, { w: 2, head: 9 });
      s += t(85, 38, '버튼 · 센서 →', { a: 'm', size: 13, c: C.sub }) + t(395, 38, '→ 램프 · MC', { a: 'm', size: 13, c: C.sub });
      s += F.route([[395, 122], [395, 158], [85, 158], [85, 124]], { c: C.green, w: 2.2, head: 10 });
      s += t(240, 176, '끝없이 반복 — 한 바퀴 = 1 스캔', { a: 'm', b: 1, size: 15, c: C.green });
      s += t(240, 208, '한 바퀴 도는 시간 = 스캔 타임 (수 ms)', { a: 'm', size: 14, c: C.sub });
      return F.svg(480, 226, s);
    } },

  'scan-miss': { stage: [6], cards: ['PLC 속은 이렇게 돌아간다 — 스캔'],
    cap: '입력은 스캔마다 한 번 읽는다 — 읽는 순간 사이에 끝난 짧은 신호는 놓친다',
    draw: function () {
      var s = '', rd = [110, 220, 330, 440];
      rd.forEach(function (x) { s += divider(x, 40, 140) + F.poly([[x - 7, 34], [x + 7, 34], [x, 44]], { close: 1, fill: C.blue, c: C.blue, w: 1 }); });
      s += t(16, 22, '▼ = 입력을 읽는 순간', { size: 13, c: C.blue, b: 1 });
      s += t(16, 96, '센서', { b: 1 }) + wave([170, 270, 360, 390], 110, 78, 70, 462);
      s += F.circle(220, 78, 7, { fill: C.greenL, c: C.green, w: 2 }) + t(220, 60, '잡음 ✓', { a: 'm', b: 1, size: 14, c: C.green });
      s += t(375, 60, '놓침 ✕', { a: 'm', b: 1, size: 14, c: C.red });
      s += arrow(70, 150, 466, 150, { c: C.sub, w: 1.4, head: 8 });
      s += t(165, 168, '스캔 1', { a: 'm', size: 13, c: C.sub }) + t(275, 168, '스캔 2', { a: 'm', size: 13, c: C.sub }) + t(385, 168, '스캔 3', { a: 'm', size: 13, c: C.sub });
      s += t(240, 198, '짧은 신호를 꼭 잡아야 하면 → 인터럽트 · 래치', { a: 'm', b: 1, size: 14 });
      return F.svg(480, 216, s);
    } },

  'relay-plc': { stage: [6], cards: ['PLC 란 — 릴레이 제어반을 대신한다'],
    cap: '릴레이 제어반은 동작을 바꾸려면 배선을 다시 하고, PLC 는 프로그램만 고친다',
    draw: function () {
      var s = t(118, 26, '릴레이 제어반', { a: 'm', b: 1, size: 16, c: C.red }) + t(362, 26, 'PLC', { a: 'm', b: 1, size: 16, c: C.green });
      s += box(28, 44, 180, 124, { fill: C.grayL, c: C.sub, w: 1.6 });
      for (var i = 0; i < 3; i++) for (var j = 0; j < 4; j++) s += box(42 + j * 42, 56 + i * 36, 26, 20, { fill: C.paper, c: C.ink, w: 1.4, r: 3 });
      s += F.path('M55,76 C70,100 110,70 139,112', { c: C.red, w: 1.4 }) + F.path('M97,76 C60,120 150,110 181,148', { c: C.red, w: 1.4 }) +
        F.path('M181,76 C150,100 90,130 55,148', { c: C.red, w: 1.4 }) + F.path('M139,76 C160,96 100,150 97,148', { c: C.red, w: 1.4 });
      s += t(118, 192, '동작을 바꾸려면', { a: 'm', size: 14 }) + t(118, 216, '배선을 다시', { a: 'm', b: 1, size: 16, c: C.red });
      s += arrow(214, 106, 246, 106, { w: 2.2, head: 10 });
      /* PLC + 노트북 */
      s += box(262, 56, 120, 84, { fill: C.greenL, c: C.green, w: 2 }) + t(322, 86, 'PLC', { a: 'm', b: 1, size: 18, halo: false, c: C.green });
      for (var k = 0; k < 6; k++) s += box(270 + k * 18, 118, 12, 12, { fill: C.paper, c: C.ink, w: 1.2, r: 2 });
      s += box(398, 70, 64, 44, { fill: C.paper, c: C.ink, w: 1.8, r: 4 }) + F.poly([[392, 118], [468, 118], [462, 126], [398, 126]], { close: 1, fill: C.grayM, w: 1.4 });
      s += line(408, 82, 450, 82, { w: 2, c: C.blue }) + line(408, 94, 440, 94, { w: 2, c: C.blue }) + line(408, 106, 452, 106, { w: 2, c: C.blue });
      s += F.path('M382,100 C388,100 390,122 398,122', { w: 1.6 });
      s += t(362, 192, '동작을 바꾸려면', { a: 'm', size: 14 }) + t(362, 216, '프로그램만 고친다', { a: 'm', b: 1, size: 16, c: C.green });
      return F.svg(480, 234, s);
    } },

  'plc-io': { stage: [6], cards: ['입력과 출력 — 무엇이 어디에 붙나'],
    cap: 'PLC 구성 — 입력 기기(신호를 준다) → 입력부 → CPU → 출력부 → 출력 기기(움직인다)',
    draw: function () {
      var s = t(64, 26, '입력 기기', { a: 'm', b: 1, c: C.blue }) + t(420, 26, '출력 기기', { a: 'm', b: 1, c: C.orange });
      s += box(140, 56, 200, 142, { fill: C.paper, c: C.ink, w: 2 }) + t(240, 44, 'PLC', { a: 'm', b: 1, size: 15 });
      s += box(150, 76, 56, 72, { fill: C.blueL, c: C.blue, label: '입력부', size: 14 });
      s += box(214, 76, 52, 72, { fill: C.grayL, c: C.ink, label: 'CPU', size: 15 });
      s += box(274, 76, 56, 72, { fill: C.orangeL, c: C.orange, label: '출력부', size: 14 });
      s += box(150, 160, 180, 28, { fill: C.grayL, c: C.sub, label: '전원부', size: 14 });
      s += arrow(206, 112, 213, 112, { w: 1.8, head: 7 }) + arrow(266, 112, 273, 112, { w: 1.8, head: 7 });
      var yi = [76, 112, 148], li = ['누름버튼', '리밋스위치', '근접센서'], lo = ['표시등', '솔레노이드', 'MC'];
      yi.forEach(function (y, i) {
        s += t(18, y, li[i], { size: 14 }) + line(100, y, 118, y, { w: 1.6 }) + line(118, y, 118, 112, { w: 1.6 });
        s += t(372, y, lo[i], { size: 14 }) + line(346, y, 364, y, { w: 1.6 }) + line(346, y, 346, 112, { w: 1.6 });
      });
      s += arrow(118, 112, 148, 112, { w: 1.8, head: 8, c: C.blue }) + arrow(331, 112, 346, 112, { w: 1.8, head: 8, c: C.orange });
      s += arrow(400, 148, 432, 148, { w: 1.6, head: 8 }) + F.circle(450, 148, 15, { fill: C.paper, w: 1.8 }) + t(450, 148, 'M', { a: 'm', b: 1, size: 14, halo: false });
      s += t(420, 176, '모터는 MC 를 거쳐', { a: 'm', size: 13, c: C.sub });
      s += t(240, 226, '입력 = 신호를 주는 것 · 출력 = 움직이는 것', { a: 'm', b: 1, size: 15 });
      s += t(240, 250, '어느 기기를 어느 번지에? → 입출력 할당표', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 266, s);
    } },

  /* ─────────── 7 · XG5000 래더 ─────────── */
  devices: { stage: [7], cards: ['디바이스 이름 — P M T C D', '메모리 영역 — P M T C D 를 구분한다'],
    cap: '디바이스 — X·Y 는 겉의 단자(실제 기기), M·T·C·D 는 PLC 속에서만 쓴다',
    draw: function () {
      var s = box(110, 40, 260, 150, { fill: C.grayL, c: C.ink, w: 2 }) + t(240, 58, 'PLC', { a: 'm', b: 1, size: 16, halo: false });
      s += box(122, 76, 60, 90, { fill: C.blueL, c: C.blue }) + t(152, 106, 'X', { a: 'm', b: 1, size: 24, c: C.blue, halo: false }) + t(152, 138, '입력', { a: 'm', size: 14, b: 1, halo: false });
      s += box(298, 76, 60, 90, { fill: C.orangeL, c: C.orange }) + t(328, 106, 'Y', { a: 'm', b: 1, size: 24, c: C.orange, halo: false }) + t(328, 138, '출력', { a: 'm', size: 14, b: 1, halo: false });
      var dv = [['M', '릴레이', 192, 76], ['T', '타이머', 242, 76], ['C', '카운터', 192, 122], ['D', '데이터', 242, 122]];
      dv.forEach(function (d) {
        s += box(d[2], d[3], 46, 42, { fill: C.paper, c: C.green, w: 1.6, r: 5 }) +
          t(d[2] + 23, d[3] + 14, d[0], { a: 'm', b: 1, size: 16, c: C.green, halo: false }) + t(d[2] + 23, d[3] + 31, d[1], { a: 'm', size: 13, halo: false });
      });
      s += t(240, 178, '속에만 있다 — 밖으로 선 없음', { a: 'm', size: 13, c: C.green, b: 1 });
      for (var i = 0; i < 3; i++) s += box(104, 92 + i * 26, 12, 12, { fill: C.paper, c: C.ink, w: 1.2, r: 2 }) + box(364, 92 + i * 26, 12, 12, { fill: C.paper, c: C.ink, w: 1.2, r: 2 });
      s += t(52, 112, '버튼', { a: 'm', size: 14 }) + t(52, 132, '센서', { a: 'm', size: 14 }) + arrow(78, 122, 102, 122, { w: 1.8, head: 8 });
      s += arrow(378, 122, 402, 122, { w: 1.8, head: 8 }) + t(432, 112, '램프', { a: 'm', size: 14 }) + t(432, 132, 'MC', { a: 'm', size: 14 });
      s += t(240, 216, 'X · Y = 실제 기기가 붙는 단자  ·  M T C D = 프로그램 안', { a: 'm', b: 1, size: 14 });
      s += t(240, 240, '(LS 실물 PLC 는 입출력 단자를 P 번지로 부른다)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 256, s);
    } },

  'ladder-cmd': { stage: [4, 7], cards: ['디바이스 이름 — P M T C D'],
    cap: '래더 한 줄을 명령어로 — LOAD(시작) · OR(병렬) · AND NOT(직렬 b접점) · OUT(코일)',
    draw: function () {
      var y = 84, yh = 150, s = bus(18, 50, 176) + bus(282, 50, 176);
      s += w(18, y, 50) + la(56, y, 'X0') + w(62, y, 120) + la(126, y, 'X1', { b: 1 }) + w(132, y, 241) + lc(250, y, 'Y0') + w(259, y, 282);
      s += w(36, y, 36, yh) + w(36, yh, 50) + la(56, yh, 'Y0', { below: 1 }) + w(62, yh, 90) + w(90, yh, 90, y) + dot(36, y, 3) + dot(90, y, 3);
      s += F.num(78, 62, 1, { c: C.blue, r: 10, size: 12 }) + F.num(78, yh - 22, 2, { c: C.blue, r: 10, size: 12 }) +
        F.num(148, 62, 3, { c: C.blue, r: 10, size: 12 }) + F.num(272, 62, 4, { c: C.blue, r: 10, size: 12 });
      var cmd = ['LOAD X0', 'OR Y0', 'AND NOT X1', 'OUT Y0'];
      cmd.forEach(function (c, i) {
        var yy = 64 + i * 34;
        s += F.num(314, yy, i + 1, { c: C.blue, r: 11, size: 13 }) + t(332, yy, c, { b: 1 });
      });
      s += t(384, 198, '위에서부터 차례로', { a: 'm', size: 13, c: C.sub });
      s += line(296, 42, 296, 186, { c: C.edge, w: 1.4 });
      s += t(240, 216, 'NOT = b접점 · AND = 직렬 · OR = 병렬', { a: 'm', b: 1, size: 15, c: C.orange });
      return F.svg(480, 236, s);
    } },

  'm-relay': { stage: [7], cards: ['메모리 영역 — P M T C D 를 구분한다'],
    cap: 'M(보조 릴레이)은 밖으로 나가는 선이 없는 가상 릴레이 — 중간 상태를 기억해 두고 Y 를 움직인다',
    draw: function () {
      var G = C.green, s = bus(24, 40, 230) + bus(400, 40, 230);
      s += t(212, 22, 'PLC 안 (프로그램)', { a: 'm', size: 13, c: C.sub, b: 1 }) + t(446, 22, 'PLC 밖', { a: 'm', size: 13, c: C.sub, b: 1 });
      s += divider(416, 30, 236);
      var y = 70, yh = 122, y2 = 212;
      s += w(24, y, 50) + la(56, y, 'X0') + w(62, y, 120) + la(126, y, 'X1', { b: 1 }) + w(132, y, 331) + lc(340, y, 'M0000', { c: G }) + w(349, y, 400);
      s += w(38, y, 38, yh) + w(38, yh, 50) + la(56, yh, 'M0000', { c: G, below: 1 }) + w(62, yh, 86) + w(86, yh, 86, y) + dot(38, y, 3) + dot(86, y, 3);
      s += w(24, y2, 50) + la(56, y2, 'M0000', { c: G }) + w(62, y2, 331) + lc(340, y2, 'Y0') + w(349, y2, 400);
      s += t(446, 66, '선 없음', { a: 'm', size: 13, b: 1, c: G }) + t(446, 86, '✕', { a: 'm', size: 15, b: 1, c: G });
      s += arrow(404, y2, 428, y2, { c: C.orange, w: 1.8, head: 8 }) + lamp(446, y2, { on: 1, c: C.orange }) + t(446, y2 + 26, '램프', { a: 'm', size: 13 });
      s += t(212, 254, 'M 은 가상 릴레이 — 「지금 몇 단계인지」 같은 상태를 기억', { a: 'm', b: 1, size: 14 });
      return F.svg(480, 272, s);
    } },

  'io-table': { stage: [6, 7], cards: ['입력과 출력 — 무엇이 어디에 붙나', '프로그램 만드는 순서 — 급하면 돌아간다'],
    cap: '입출력 할당표(I/O 리스트) — 어느 기기가 어느 번지인지 먼저 정한다 (번지는 예)',
    draw: function () {
      var rows = [['X0', '기동 버튼 (PB-ON)', 1], ['X1', '정지 버튼 (PB-OFF)', 1], ['X2', '리밋 스위치 (LS1)', 1], ['Y0', '전자접촉기 (MC)', 0], ['Y1', '표시등 (PL)', 0]];
      var x0 = 80, x1 = 170, x2 = 430, y0 = 30, h = 32, s = '';
      s += box(x0, y0, x1 - x0, h, { fill: C.grayM, c: C.ink, w: 1.4, r: 0, label: '번지', size: 15 }) +
        box(x1, y0, x2 - x1, h, { fill: C.grayM, c: C.ink, w: 1.4, r: 0, label: '연결 기기', size: 15 });
      rows.forEach(function (r, i) {
        var y = y0 + h * (i + 1), c = r[2] ? C.blue : C.orange;
        s += box(x0, y, x1 - x0, h, { fill: r[2] ? C.blueL : C.orangeL, c: C.ink, w: 1.4, r: 0 }) + t((x0 + x1) / 2, y + h / 2, r[0], { a: 'm', b: 1, c: c, halo: false }) +
          box(x1, y, x2 - x1, h, { fill: C.paper, c: C.ink, w: 1.4, r: 0 }) + t(x1 + 16, y + h / 2, r[1], { size: 15, halo: false });
      });
      s += F.poly([[70, 64], [60, 64], [60, 158], [70, 158]], { c: C.blue, w: 1.8 }) + t(46, 111, '입\n력', { a: 'm', b: 1, size: 14, c: C.blue });
      s += F.poly([[70, 164], [60, 164], [60, 222], [70, 222]], { c: C.orange, w: 1.8 }) + t(46, 193, '출\n력', { a: 'm', b: 1, size: 14, c: C.orange });
      s += t(240, 248, '래더를 그리기 전에 먼저 만든다', { a: 'm', b: 1, size: 15 });
      return F.svg(480, 266, s);
    } },

  'xg-flow': { stage: [7], cards: ['프로그램 만드는 순서 — 급하면 돌아간다'],
    cap: 'XG5000 에서 PLC 로 — 접속 → 쓰기 → 런(RUN) → 모니터',
    draw: function () {
      var s = '', xs = [14, 132, 250, 368], a = ['접속', '쓰기', '런 (RUN)', '모니터'], b = ['PC ↔ PLC 연결', '프로그램 내려보냄', 'PLC 실행', '통전 확인'],
        fl = [C.grayL, C.blueL, C.greenL, C.orangeL], cl = [C.ink, C.blue, C.green, C.orange];
      for (var i = 0; i < 4; i++) {
        s += box(xs[i], 40, 98, 52, { fill: fl[i], c: cl[i] }) + F.num(xs[i] + 4, 40, i + 1, { c: cl[i] === C.ink ? C.sub : cl[i] }) +
          t(xs[i] + 49, 66, a[i], { a: 'm', b: 1, halo: false }) + t(xs[i] + 49, 110, b[i], { a: 'm', size: 13, c: C.sub });
        if (i < 3) s += arrow(xs[i] + 100, 66, xs[i] + 116, 66, { w: 2, head: 8 });
      }
      s += t(240, 148, '고쳤으면 다시 「쓰기」 — 화면만 고치고 잊는 실수가 가장 많다', { a: 'm', b: 1, size: 14, c: C.red });
      return F.svg(480, 170, s);
    } },

  'xg-keys': { stage: [7], cards: [],
    cap: 'XG5000 래더 단축키 — F3 a접점 · F4 b접점 · F9 코일 · F10 응용 명령',
    draw: function () {
      var s = '', xs = [66, 182, 298, 414], k = ['F3', 'F4', 'F9', 'F10'], n = ['a접점', 'b접점', '코일', '응용 명령'], y = 116;
      for (var i = 0; i < 4; i++) {
        s += box(xs[i] - 34, 28, 68, 46, { fill: C.grayL, c: C.ink, w: 1.8, r: 8 }) + box(xs[i] - 30, 30, 60, 36, { fill: C.paper, c: C.grayM, w: 1, r: 6 }) +
          t(xs[i], 48, k[i], { a: 'm', b: 1, size: 18, c: C.blue, halo: false });
      }
      s += w(xs[0] - 34, y, xs[0] - 6) + la(xs[0], y, '') + w(xs[0] + 6, y, xs[0] + 34);
      s += w(xs[1] - 34, y, xs[1] - 6) + la(xs[1], y, '', { b: 1 }) + w(xs[1] + 6, y, xs[1] + 34);
      s += w(xs[2] - 34, y, xs[2] - 9) + lc(xs[2], y, '', { c: C.ink }) + w(xs[2] + 9, y, xs[2] + 34);
      s += w(xs[3] - 44, y, xs[3] - 30) + lbox(xs[3] - 30, y, 60, 'TON') + w(xs[3] + 30, y, xs[3] + 44);
      for (var j = 0; j < 4; j++) s += t(xs[j], 156, n[j], { a: 'm', b: 1, ans: 1 });
      return F.svg(480, 178, s);
    } },

  'xg-ton': { stage: [7], cards: [],
    cap: '타이머 T 의 설정값 1 = 0.1초 — TON T0000 30 은 30 × 0.1초 = 3초',
    draw: function () {
      var y1 = 60, y2 = 116, s = bus(20, 32, 140) + bus(460, 32, 140);
      s += w(20, y1, 90) + la(96, y1, 'X0') + w(102, y1, 290) + lbox(290, y1, 136, 'TON T0000 30', { c: C.blue }) + w(426, y1, 460);
      s += w(20, y2, 90) + la(96, y2, 'T0000') + w(102, y2, 391) + lc(400, y2, 'Y0') + w(409, y2, 460);
      s += t(20, 182, 'X0', { b: 1 }) + wave([150], 192, 170, 110, 460);
      s += t(20, 228, 'Y0', { b: 1, c: C.blue }) + wave([240], 238, 216, 110, 460, { c: C.blue });
      s += divider(150, 160, 244) + divider(240, 160, 244);
      s += F.dim(150, 204, 240, 204, '3초', { c: C.blue, size: 14 });
      s += t(240, 264, '설정값 1 = 0.1초 → 30 × 0.1초 = 3초', { a: 'm', b: 1, size: 15, c: C.blue });
      return F.svg(480, 282, s);
    } },

  'double-coil': { stage: [7], cards: [],
    cap: '이중 코일 금지 — 같은 코일을 두 줄에 쓰면 스캔의 마지막 줄 결과만 남는다. 조건은 OR 로 묶는다',
    draw: function () {
      var s = t(120, 24, '✕ 이중 코일', { a: 'm', b: 1, size: 16, c: C.red }) + t(360, 24, '○ 하나로 합친다', { a: 'm', b: 1, size: 16, c: C.green }) + divider(240, 14, 180);
      var y1 = 72, y2 = 132;
      s += bus(20, 44, 156) + bus(220, 44, 156);
      s += w(20, y1, 50) + la(56, y1, 'X0') + w(62, y1, 171) + lc(180, y1, 'Y0', { c: C.red }) + w(189, y1, 220);
      s += w(20, y2, 50) + la(56, y2, 'X1') + w(62, y2, 171) + lc(180, y2, 'Y0', { c: C.red }) + w(189, y2, 220);
      s += bus(260, 44, 156) + bus(460, 44, 156);
      s += w(260, y1, 290) + la(296, y1, 'X0') + w(302, y1, 411) + lc(420, y1, 'Y0', { c: C.green }) + w(429, y1, 460);
      s += w(276, y1, 276, y2) + w(276, y2, 290) + la(296, y2, 'X1', { below: 1 }) + w(302, y2, 332) + w(332, y2, 332, y1) + dot(276, y1, 3) + dot(332, y1, 3);
      s += t(120, 196, '아래 줄 결과로 덮어쓴다', { a: 'm', b: 1, size: 14, c: C.red }) + t(360, 196, 'OR 로 묶어 코일은 한 번', { a: 'm', b: 1, size: 14, c: C.green });
      s += t(240, 228, '스캔은 위 → 아래 — 뒤에 쓴 줄이 앞의 결과를 지운다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 246, s);
    } },

  /* ─────────── 8 · 응용 회로 ─────────── */
  'y-delta': { stage: [8], cards: ['실기 단골 회로 세 가지'],
    cap: 'Y-Δ 기동 — Y결선으로 약하게 기동(기동 전류 약 1/3)하고, 타이머로 Δ결선 운전으로 바꾼다',
    draw: function () {
      var s = t(110, 26, '① Y결선으로 기동', { a: 'm', b: 1, size: 16, c: C.blue }) + t(370, 26, '② Δ결선으로 운전', { a: 'm', b: 1, size: 16, c: C.green });
      /* Y */
      [0, 120, 240].forEach(function (r) {
        s += F.g(line(0, 0, 0, -62, { w: 2.2 }) + box(-7, -48, 14, 28, { fill: C.blueL, c: C.blue, w: 1.8, r: 2 }) + dot(0, -62, 3.4), { x: 110, y: 110, r: r });
      });
      s += dot(110, 110, 3.6);
      /* Δ */
      var P = [[370, 50], [428, 150], [312, 150]];
      for (var i = 0; i < 3; i++) {
        var a = P[i], b = P[(i + 1) % 3], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
        s += line(a[0], a[1], b[0], b[1], { w: 2.2 }) + F.g(box(-14, -7, 28, 14, { fill: C.greenL, c: C.green, w: 1.8, r: 2 }), { x: mx, y: my, r: Math.round(ang) });
      }
      P.forEach(function (p) { s += dot(p[0], p[1], 3.4); });
      s += arrow(186, 104, 290, 104, { w: 2.4, head: 11 }) + t(238, 86, 't초 뒤', { a: 'm', b: 1, size: 15 }) + t(238, 124, '타이머로 전환', { a: 'm', size: 13, c: C.sub });
      s += t(110, 196, 'MC-Y ON', { a: 'm', b: 1 }) + t(110, 220, '기동 전류 약 1/3', { a: 'm', b: 1, size: 14, c: C.blue });
      s += t(370, 196, 'MC-Δ ON', { a: 'm', b: 1 }) + t(370, 220, '정상 운전', { a: 'm', b: 1, size: 14, c: C.green });
      s += t(240, 254, 'MC-Y 와 MC-Δ 는 인터록 — 동시에 켜지면 단락', { a: 'm', b: 1, size: 14, c: C.red });
      return F.svg(480, 272, s);
    } },

  displacement: { stage: [8], cards: ['변위단계선도 — 동작 순서를 그림으로'],
    cap: '변위단계선도 — 가로는 단계, 세로는 실린더 위치. A+ B+ A- B- 순서 (각 단계는 리밋스위치 신호로 넘어간다)',
    draw: function () {
      var xs = [120, 200, 280, 360, 440], s = '';
      xs.forEach(function (x, i) { s += divider(x, 40, 196) + t(x, 212, String(i + 1), { a: 'm', b: 1, size: 15, c: C.sub }); });
      s += t(280, 236, '단계 (스텝)', { a: 'm', size: 13, c: C.sub });
      s += t(24, 76, 'A', { a: 'm', b: 1, size: 20, c: C.blue }) + t(56, 56, '전진', { size: 13, c: C.sub }) + t(56, 96, '후진', { size: 13, c: C.sub });
      s += t(24, 156, 'B', { a: 'm', b: 1, size: 20, c: C.green }) + t(56, 136, '전진', { size: 13, c: C.sub }) + t(56, 176, '후진', { size: 13, c: C.sub });
      s += line(40, 118, 464, 118, { c: C.edge, w: 1.4 });
      s += F.poly([[120, 96], [200, 56], [280, 56], [360, 96], [440, 96]], { c: C.blue, w: 3 });
      s += F.poly([[120, 176], [200, 176], [280, 136], [360, 136], [440, 176]], { c: C.green, w: 3 });
      s += t(152, 66, 'A+', { a: 'm', b: 1, size: 15, c: C.blue }) + t(332, 66, 'A-', { a: 'm', b: 1, size: 15, c: C.blue });
      s += t(232, 146, 'B+', { a: 'm', b: 1, size: 15, c: C.green }) + t(412, 146, 'B-', { a: 'm', b: 1, size: 15, c: C.green });
      return F.svg(480, 250, s);
    } },

  trouble: { stage: [8], cards: ['안 움직일 때 — 순서대로 짚는다'],
    cap: '안 움직일 때 — 신호가 흐르는 순서대로 ①~⑤ 를 짚으면 고장 범위가 좁혀진다',
    draw: function () {
      var s = '';
      function node(x, y, n, a, b, fill, c) {
        return box(x, y, 124, 50, { fill: fill, c: c }) + (n ? F.num(x + 4, y, n, { c: c }) : '') +
          t(x + 62, y + 18, a, { a: 'm', b: 1, size: 15, halo: false }) + t(x + 62, y + 37, b, { a: 'm', size: 13, c: C.sub, halo: false });
      }
      s += node(16, 44, 1, '전원', '차단기 · 비상정지', C.grayL, C.ink);
      s += node(178, 44, 0, '버튼 · 센서', '누른다', C.paper, C.sub);
      s += node(340, 44, 2, '입력 램프', 'PLC 에 신호 왔나', C.blueL, C.blue);
      s += node(16, 136, 3, '프로그램', '모니터링으로 확인', C.blueL, C.blue);
      s += node(178, 136, 4, '출력 램프', 'PLC 가 내보냈나', C.blueL, C.blue);
      s += node(340, 136, 5, '부하', 'MC · 솔레노이드', C.grayL, C.ink);
      s += arrow(141, 69, 176, 69, { w: 2, head: 9 }) + arrow(303, 69, 338, 69, { w: 2, head: 9 });
      s += F.route([[402, 95], [402, 116], [78, 116], [78, 134]], { w: 2, head: 9 });
      s += arrow(141, 161, 176, 161, { w: 2, head: 9 }) + arrow(303, 161, 338, 161, { w: 2, head: 9 });
      s += t(240, 216, '입력 램프가 안 켜지면 → 배선 · 스위치 문제', { a: 'm', b: 1, size: 14, c: C.red });
      s += t(240, 240, '출력 램프는 켜지는데 안 움직이면 → PLC 밖(부하) 문제', { a: 'm', b: 1, size: 14, c: C.red });
      return F.svg(480, 258, s);
    } },

  loto: { stage: [8], cards: ['전기·공압 안전 — 손대기 전에'],
    cap: '손대기 전에 — 전원을 끄고 잠그고 표지(LOTO) · 검전기로 확인 · 공압 잔압 빼기',
    draw: function () {
      var s = divider(160, 20, 220) + divider(320, 20, 220);
      /* ① 차단기 + 자물쇠 + 표지 */
      s += box(38, 46, 62, 96, { fill: C.grayL, c: C.ink, w: 1.8, r: 6 }) + box(58, 62, 22, 60, { fill: C.paper, c: C.ink, w: 1.4, r: 4 }) +
        box(61, 96, 16, 24, { fill: C.ink, c: C.ink, w: 1, r: 3 }) + t(69, 134, 'OFF', { a: 'm', size: 13, b: 1, halo: false });
      s += F.path('M102,96 v-10 a9,9 0 0 1 18,0 v10', { c: C.red, w: 2.6 }) + box(97, 96, 28, 22, { fill: C.red, c: C.red, w: 1, r: 3 });
      s += line(111, 118, 118, 132, { w: 1.2 }) + box(100, 132, 50, 44, { fill: C.redL, c: C.red, w: 1.6, r: 3 }) +
        t(125, 146, '조작', { a: 'm', size: 13, b: 1, c: C.red, halo: false }) + t(125, 164, '금지', { a: 'm', size: 13, b: 1, c: C.red, halo: false });
      s += t(80, 204, 'LOTO', { a: 'm', b: 1, size: 16, c: C.red }) + t(80, 228, '끄고·잠그고·표지', { a: 'm', size: 13 });
      /* ② 검전기 */
      s += box(186, 108, 108, 44, { fill: C.grayL, c: C.ink, w: 1.8, r: 4 });
      [206, 240, 274].forEach(function (x) { s += F.circle(x, 130, 9, { fill: C.paper, w: 1.6 }) + line(x - 5, 130, x + 5, 130, { w: 1.4 }); });
      s += line(282, 44, 244, 120, { c: C.blue, w: 7 }) + line(244, 120, 240, 128, { c: C.ink, w: 2.4 }) + F.circle(276, 56, 6, { fill: C.yellowL, c: C.blue, w: 1.6 });
      s += t(240, 204, '검전', { a: 'm', b: 1, size: 16, c: C.blue }) + t(240, 228, '정말 꺼졌나 확인', { a: 'm', size: 13 });
      /* ③ 잔압 */
      s += line(332, 130, 468, 130, { c: C.grayM, w: 10 }) + F.poly([[380, 118], [410, 142], [410, 118], [380, 142]], { close: 1, fill: C.paper, w: 1.8 });
      s += line(440, 124, 440, 106, { w: 2 }) + arrow(440, 100, 440, 62, { c: C.orange, w: 2, head: 9 }) + arrow(426, 100, 414, 66, { c: C.orange, w: 2, head: 9 }) +
        arrow(454, 100, 466, 66, { c: C.orange, w: 2, head: 9 });
      s += t(400, 204, '잔압 빼기', { a: 'm', b: 1, size: 16, c: C.orange }) + t(400, 228, '배관 풀기 전에', { a: 'm', size: 13 });
      return F.svg(480, 244, s);
    } },

  flicker: { stage: [8], cards: [],
    cap: '플리커 — 타이머 두 개가 서로 끊고 켜며 1초 꺼짐 · 1초 켜짐을 되풀이한다 (T 설정 10 = 1초)',
    draw: function () {
      var s = bus(20, 28, 178) + bus(460, 28, 178), y1 = 54, y2 = 108, y3 = 162;
      s += w(20, y1, 64) + la(70, y1, 'X0') + w(76, y1, 144) + la(150, y1, 'T0002', { b: 1 }) + w(156, y1, 300) + lbox(300, y1, 130, 'TON T0001 10') + w(430, y1, 460);
      s += w(20, y2, 64) + la(70, y2, 'T0001') + w(76, y2, 300) + lbox(300, y2, 130, 'TON T0002 10') + w(430, y2, 460);
      s += w(20, y3, 64) + la(70, y3, 'T0001') + w(76, y3, 391) + lc(400, y3, 'Y0') + w(409, y3, 460);
      s += t(20, 214, 'X0', { b: 1 }) + wave([130], 224, 204, 100, 462);
      s += t(20, 258, 'Y0', { b: 1, c: C.orange }) + wave([190, 250, 310, 370, 430], 268, 248, 100, 462, { c: C.orange });
      s += F.dim(130, 284, 190, 284, '1초', { side: -1, size: 13 }) + F.dim(190, 284, 250, 284, '1초', { side: -1, size: 13 });
      s += t(372, 292, '꺼짐 · 켜짐 반복', { a: 'm', b: 1, size: 14, c: C.orange });
      return F.svg(480, 310, s);
    } },

  conveyor: { stage: [8], cards: [],
    cap: '컨베이어 순차 운전 — 기동은 받는 쪽(C)부터, 정지는 넣는 쪽(A)부터 (타이머로 시간차)',
    draw: function () {
      var s = '', bx = [40, 185, 330], nm = ['A', 'B', 'C'];
      bx.forEach(function (x, i) {
        s += box(x, 34, 110, 22, { fill: C.grayL, c: C.ink, w: 1.8, r: 11 }) + F.circle(x + 11, 45, 6, { fill: C.paper, w: 1.4 }) + F.circle(x + 99, 45, 6, { fill: C.paper, w: 1.4 }) +
          t(x + 55, 45, nm[i], { a: 'm', b: 1, halo: false }) + box(x + 34, 20, 14, 14, { fill: C.orangeL, c: C.orange, w: 1.2, r: 2 });
        if (i < 2) s += arrow(x + 114, 45, x + 142, 45, { w: 2, head: 8 });
      });
      s += t(40, 74, '넣는 쪽', { size: 13, c: C.sub }) + t(440, 74, '받는 쪽', { a: 'e', size: 13, c: C.sub });
      var rows = [['A', 210, 340, 128], ['B', 170, 380, 160], ['C', 130, 420, 192]];
      rows.forEach(function (r) {
        s += t(96, r[3], r[0], { a: 'm', b: 1 }) + line(110, r[3], 460, r[3], { c: C.edge, w: 1.2 }) +
          box(r[1], r[3] - 9, r[2] - r[1], 18, { fill: C.blueL, c: C.blue, w: 1.6, r: 3 });
      });
      s += t(170, 104, '기동: C → B → A', { a: 'm', b: 1, size: 14, c: C.green }) + t(380, 104, '정지: A → B → C', { a: 'm', b: 1, size: 14, c: C.red });
      s += t(240, 228, '벨트 위에 제품이 남거나 쌓이지 않게', { a: 'm', b: 1, size: 14 });
      return F.svg(480, 246, s);
    } },

  shuttle: { stage: [8], cards: [],
    cap: '자동 왕복 운전 — 끝의 리밋스위치에 닿으면 정회전·역회전이 바뀐다 (정역 회로 + 리밋스위치)',
    draw: function () {
      var s = line(30, 124, 450, 124, { w: 2.4 });
      for (var i = 36; i < 450; i += 16) s += line(i, 126, i - 8, 136, { c: C.sub, w: 1 });
      s += box(200, 88, 72, 30, { fill: C.blueL, c: C.blue, w: 2, r: 4, label: '대차', size: 15 }) + F.circle(216, 120, 6, { fill: C.paper, w: 1.6 }) + F.circle(256, 120, 6, { fill: C.paper, w: 1.6 });
      s += box(34, 92, 16, 28, { fill: C.grayL, c: C.ink, w: 1.6, r: 2 }) + line(50, 100, 62, 92, { w: 1.6 }) + F.circle(65, 90, 4, { fill: C.paper, w: 1.6 });
      s += box(430, 92, 16, 28, { fill: C.grayL, c: C.ink, w: 1.6, r: 2 }) + line(430, 100, 418, 92, { w: 1.6 }) + F.circle(415, 90, 4, { fill: C.paper, w: 1.6 });
      s += t(42, 152, 'LS1', { a: 'm', b: 1 }) + t(438, 152, 'LS2', { a: 'm', b: 1 });
      s += arrow(284, 72, 364, 72, { c: C.blue, w: 2.4, head: 10 }) + t(324, 54, '정회전', { a: 'm', b: 1, size: 14, c: C.blue });
      s += arrow(188, 72, 108, 72, { c: C.green, w: 2.4, head: 10 }) + t(148, 54, '역회전', { a: 'm', b: 1, size: 14, c: C.green });
      s += t(20, 180, '닿으면 → 다시 정회전', { size: 13, b: 1, c: C.blue }) + t(460, 180, '닿으면 → 역회전으로', { a: 'e', size: 13, b: 1, c: C.green });
      return F.svg(480, 200, s);
    } },

  'first-in': { stage: [8], cards: [],
    cap: '선입력 우선 — 먼저 켜진 쪽의 b접점이 상대 줄을 끊어, 나중에 눌러도 켜지지 않는다 (퀴즈 버저)',
    draw: function () {
      var G = C.green, R = C.red, y1 = 66, h1 = 110, y2 = 196, h2 = 240, s = bus(24, 34, 262) + bus(456, 34, 262);
      s += w(24, y1, 70, G) + la(76, y1, 'PB-A') + w(82, y1, 120) + w(46, y1, 46, h1, G) + w(46, h1, 70, G) + la(76, h1, 'L-A', { c: G, below: 1 }) +
        w(82, h1, 120, G) + w(120, h1, 120, y1, G) + dot(46, y1, 3, G) + dot(120, y1, 3, G) +
        w(120, y1, 190, G) + la(196, y1, 'L-B', { b: 1, c: G }) + w(202, y1, 371, G) + lc(380, y1, 'L-A', { c: G }) + w(389, y1, 456, G);
      s += w(24, y2, 70) + la(76, y2, 'PB-B') + w(82, y2, 120) + w(46, y2, 46, h2) + w(46, h2, 70) + la(76, h2, 'L-B', { below: 1 }) +
        w(82, h2, 120) + w(120, h2, 120, y2) + dot(46, y2, 3) + dot(120, y2, 3) +
        w(120, y2, 190) + la(196, y2, 'L-A', { b: 1, c: R }) + w(202, y2, 371) + lc(380, y2, 'L-B', { c: C.ink }) + w(389, y2, 456);
      s += t(420, y1 + 24, '먼저 켜짐', { a: 'm', size: 13, b: 1, c: G }) + t(420, y2 + 24, '못 켜짐', { a: 'm', size: 13, b: 1, c: R });
      s += t(300, 154, 'L-A 가 켜져 이 b접점이 열린다 ↓', { a: 'm', size: 13, b: 1, c: R });
      return F.svg(480, 282, s);
    } },

  toggle: { stage: [8], cards: [],
    cap: '교번(플립플롭) — 버튼을 누를 때마다 출력이 켜짐 ↔ 꺼짐으로 바뀐다 (PLC 는 양변환 접점 ┤P├ + M 으로 만든다)',
    draw: function () {
      var s = t(20, 60, '버튼', { b: 1 }) + wave([120, 140, 210, 230, 300, 320, 390, 410], 70, 48, 90, 462);
      s += t(20, 128, '출력', { b: 1, c: C.blue }) + wave([120, 210, 300, 390], 138, 114, 90, 462, { c: C.blue });
      [120, 210, 300, 390].forEach(function (x) { s += divider(x, 40, 146); });
      ['켜짐', '꺼짐', '켜짐', '꺼짐'].forEach(function (k, i) { s += t(165 + i * 90, 160, k, { a: 'm', size: 13, b: 1, c: i % 2 ? C.sub : C.blue }); });
      s += t(240, 192, '한 번 누르면 켜지고 · 또 누르면 꺼진다', { a: 'm', b: 1, size: 15 });
      return F.svg(480, 210, s);
    } }

  };
})();
})();
(function () {
  var PICK = {
  M: {'osi': 'osi', 'osiTcp': 'osiTcp', 'cables': 'cables', 'protocol': 'protocol', 'modulation': 'modulation', 'lineCode': 'lineCode', 'switching': 'switching', 'mux': 'mux', 'dteDce': 'dteDce', 'fwIds': 'fwIds', 'jitter': 'jitter', 'netParts': 'netParts', 'netScale': 'netScale', 'mtbf': 'mtbf', 'rssi': 'rssi', 'collect': 'collect', 'edge': 'edge', 'adc': 'adc', 'bias': 'bias', 'dataInfo': 'dataInfo', 'cast': 'cast', 'robotSys': 'robotSys', 'cobot': 'cobot', 'arm': 'arm', 'encoder': 'encoder', 'frames': 'frames', 'robotTypes': 'robotTypes', 'motion': 'motion', 'robotCell': 'robotCell', 'safety4': 'safety4', 'scada': 'scada', 'zone': 'zone', 'ipPlan': 'ipPlan', 'hmiSys': 'hmiSys', 'hmiChain': 'hmiChain', 'ifChain': 'ifChain', 'opcua': 'opcua', 'opcTier': 'opcTier', 'rdbTsdb': 'rdbTsdb', 'law': 'law', 'riskMatrix': 'riskMatrix', 'loop': 'loop', 'openClosed': 'openClosed', 'onoff': 'onoff', 'blockEq': 'blockEq', 'plcParts': 'plcParts', 'relayPlc': 'relayPlc', 'plcLang': 'plcLang', 'ladderRule': 'ladderRule', 'contacts': 'contacts', 'timer': 'timer', 'hmiScreen': 'hmiScreen', 'meters': 'meters', 'sensorSpec': 'sensorSpec', 'sensorChain': 'sensorChain', 'photo': 'photo', 'thermo': 'thermo', 'hall': 'hall', 'sensorTree': 'sensorTree', 'slip': 'slip', 'dcMotor': 'dcMotor', 'servoStep': 'servoStep', 'trip': 'trip', 'inverter': 'inverter', 'startCur': 'startCur', 'pneuSys': 'pneuSys', 'pressure': 'pressure', 'fluidLaws': 'fluidLaws', 'dirValve': 'dirValve', 'cylinder': 'cylinder', 'meter': 'meter'},
  P: {'frl': 'frl', 'pilot': 'pilot', 'shuttle': 'shuttle', 'solenoid': 'solenoid', 'seqv': 'seqv', 'quickexh': 'quickexh', 'tri': 'tri', 'hold': 'hold', 'compress': 'compress'},
  S: {'loto': 'loto', 'counter': 'ctu-chart', 'gates': 'and-or', 'scan': 'scan', 'dblCoil': 'double-coil', 'reverse': 'fwd-rev'}
  };
  Object.keys(PICK).forEach(function (v) {
    var src = FIGS_SRC[v] || {};
    Object.keys(PICK[v]).forEach(function (k) {
      var e = src[PICK[v][k]];
      if (e && !FIGS[k]) FIGS[k] = e;
      else if (!e && window.console) console.warn('[figs.js] 가져올 그림 없음: ' + v + '.' + PICK[v][k]);
    });
  });
})();
/*@@END COPY@@*/

/*@@QFIG@@*/
window.QFIG = {
  osi: 'c01-s1-01 c01-s1-04 c01-s1-09 c01-s1-12 c01-s1-14 c01-s1-16 c01-s1-18 cbt2-07',
  osiTcp: 'c01-s1-03 cbt3-12',
  cables: 'c01-s1-05 cbt1-42 cbt3-25',
  protocol: 'c01-s1-06 cbt1-16',
  modulation: 'c01-s1-02 c01-s1-15 cbt1-55',
  lineCode: 'c01-s1-13 cbt3-38',
  tcpUdp: 'c01-s1-10 c05-s1-04 c05-s1-07 c05-s1-16 cbt3-14',
  switching: 'c01-s2-01 c01-s2-04 c01-s2-09 c01-s2-14 c01-s2-18 cbt2-59',
  mux: 'c01-s2-02 c01-s2-05 c01-s2-13 c01-s2-17 cbt3-51',
  dteDce: 'c01-s2-03 c01-s2-06 c01-s2-11 c01-s2-15',
  topology: 'c01-s2-07 c01-s2-10 c01-s2-12 c01-s2-16 c01-s2-20 c06-s1-13 cbt1-29',
  fwIds: 'c01-s3-01 c01-s3-04 cbt2-33',
  jitter: 'c01-s3-10',
  netQuality: 'c01-s3-05 c01-s3-14 c01-s3-18 c02-s1-08 c02-s1-11 c02-s1-15 c02-s2-03 c02-s2-08 c02-s2-12 c02-s3-03 c02-s3-08 c02-s3-12 cbt1-40 cbt2-57',
  netParts: 'c02-s1-01 c02-s1-18 cbt1-53',
  netScale: 'c02-s1-02 c02-s1-03 c02-s1-07 c02-s1-13 c02-s1-17 c03-s2-13 c03-s2-14 c03-s2-15 c03-s2-16 cbt1-14 cbt2-31 cbt3-10',
  mtbf: 'c02-s1-04 cbt2-05',
  rssi: 'c02-s2-04 c02-s3-04',
  rtHardSoft: 'c02-s1-20 c02-s2-18 c02-s3-18',
  collect: 'c03-s1-01 c03-s1-02 c03-s1-03 c03-s1-04 cbt1-20',
  edge: 'c03-s1-10 c03-s1-15 cbt2-49',
  adc: 'c03-s1-18 c03-s1-19 c03-s1-20 c03-s1-43 cbt1-45',
  nyquist: 'c03-s1-21 c03-s1-44 cbt2-10',
  bias: 'c03-s1-22 c03-s1-23 cbt3-54',
  adcLin: 'c03-s1-31 c03-s1-32 c03-s1-33',
  zin: 'c03-s1-26 cbt1-07',
  diffCh: 'c03-s1-35 c08-s4-10',
  dataInfo: 'c03-s2-02',
  cast: 'c03-s2-19 c03-s2-20 c03-s2-21 cbt1-32',
  autoSteps: 'c03-s2-31 c03-s2-32 c03-s2-43 cbt1-58',
  auto5: 'c03-s2-33 c03-s2-34 c03-s2-35 c03-s2-36 c03-s2-37 c03-s2-44 c03-s2-45',
  maintTypes: 'c03-s1-11 c11-s3-04 c11-s3-05 c11-s3-06 c11-s3-09 c11-s3-10 c12-s4-10 c12-s4-11 cbt3-02 cbt3-42',
  robotSys: 'c04-s1-01 c04-s1-04 c04-s1-05 c04-s1-06 c04-s1-21 c04-s1-25 c04-s1-26 c04-s1-28 cbt2-03',
  cobot: 'c04-s1-02 c04-s1-22 c07-s1-56 c07-s1-57 c07-s1-58 cbt1-24',
  agvPath: 'c04-s1-03 c04-s1-24 c07-s1-79 cbt2-15',
  arm: 'c04-s1-07 c04-s1-08 c04-s1-27 c04-s1-30 c04-s1-45 cbt3-20',
  encoder: 'c04-s1-10 c04-s1-32 cbt3-33',
  frames: 'c04-s1-11 c04-s1-34 c04-s1-42 cbt2-28 cbt3-46',
  robotTypes: 'c04-s1-12 c04-s1-13 c04-s1-14 c04-s1-15 c04-s1-36 c04-s1-37 c04-s1-38 cbt1-11',
  motion: 'c04-s1-16 c04-s1-17 c04-s1-18 c04-s1-39 c04-s1-40 c04-s1-41 c04-s1-43',
  robotCell: 'c04-s1-19 c07-s1-26 c07-s1-27 c07-s1-41 c07-s1-44 c07-s1-45 c07-s1-46 c07-s1-52 c07-s1-54 cbt1-15',
  sensGuard: 'c04-s1-20 c04-s2-16 c04-s2-21 c04-s2-31 c04-s2-34 c07-s1-37 c07-s1-49',
  cobot4: 'c04-s1-23 c04-s1-44 c07-s1-59 c07-s1-72 c07-s1-74 c07-s1-75 cbt1-28 cbt2-19 cbt2-32 cbt3-59',
  commission: 'c04-s2-08 c04-s2-09 c04-s2-11 c04-s2-12 c04-s2-13 c04-s2-17 c04-s2-18 c04-s2-20 c04-s2-29 c04-s2-32 c04-s2-33 c04-s2-35',
  safety4: 'c04-s2-10 c04-s2-30 c10-s3-01 c10-s3-03 c10-s3-04 c10-s3-13 c10-s3-16 c10-s3-20 c10-s3-25 cbt2-34 cbt2-41 cbt3-52',
  scada: 'c05-s1-01 c05-s1-02 c05-s1-05 c05-s1-06 c05-s1-08 c05-s1-18 c06-s2-10 c09-s1-02 c09-s1-11 c09-s1-17 cbt1-18 cbt2-04 cbt2-35',
  zone: 'c05-s1-13 c05-s1-20 c06-s2-15 cbt3-53',
  ipPlan: 'c05-s1-10 c05-s1-25 c05-s2-18 c06-s2-03',
  commTest: 'c05-s1-15 c05-s1-24 c05-s2-10 c05-s2-15 c05-s2-20 c05-s2-21 c05-s3-02 c05-s3-08 c05-s3-11 c05-s3-16 cbt1-57 cbt2-48',
  hmiSys: 'c05-s1-17',
  hmiChain: 'c05-s3-09 c05-s3-14 c09-s1-10 c09-s1-18 c09-s3-06 c09-s3-17 c09-s3-20 cbt1-05 cbt1-51 cbt3-60',
  noiseWiring: 'c03-s2-29 c05-s2-05 c05-s2-17 c08-s4-05 c08-s4-06 c09-s4-12 c09-s4-18 c09-s4-19 c09-s4-20 c09-s4-24 c11-s3-03 c12-s3-23 cbt2-43 cbt3-27 cbt3-41',
  ifChain: 'c06-s1-01 c06-s1-05 c06-s1-23 c06-s2-05 c06-s2-06 c06-s2-12 c06-s2-17 c06-s2-20 c06-s2-21 cbt1-48 cbt2-01 cbt2-26 cbt2-39 cbt3-05',
  opcua: 'c06-s1-04 c06-s1-08 c06-s1-16 c06-s1-25 c06-s2-16 cbt2-13',
  opcTier: 'c06-s1-02 c06-s1-11 c06-s1-18 cbt3-44',
  rdbTsdb: 'c06-s1-09 cbt2-52',
  law: 'c07-s1-06 c07-s1-07',
  riskMatrix: 'c07-s1-04 c07-s1-11 cbt3-24',
  loto: 'c07-s1-32 c07-s1-33 c07-s1-39 c07-s1-47 c07-s1-48 cbt1-41',
  signs: 'cbt3-50',
  loop: 'c08-s1-01 c08-s1-02 c08-s1-03 c08-s1-04 c08-s1-05 c08-s1-06 c08-s1-07 c08-s1-08 c08-s1-09 c08-s1-10 c08-s1-20 cbt1-08 cbt3-04',
  openClosed: 'c08-s1-11 c08-s1-12 c08-s1-13 c08-s1-14 c08-s1-15 c08-s1-16 c08-s1-17 c08-s1-18 c08-s1-49 cbt1-47 cbt2-38 cbt3-30',
  onoff: 'c08-s1-21 c08-s1-22 c08-s1-23 c08-s1-24 cbt1-21',
  anaDig: 'c08-s1-30 c08-s1-31 cbt1-59 cbt3-17',
  blockEq: 'c08-s1-37 c08-s1-40 c08-s1-41 c08-s1-42 c08-s1-43 c08-s1-44 c08-s1-45 cbt3-43 cbt3-56',
  plcParts: 'c08-s2-01 c08-s2-10 c08-s2-15 c08-s2-16 c08-s2-17 c08-s2-18 c08-s2-19 c08-s2-20',
  relayPlc: 'c08-s2-02 c08-s2-05 c08-s2-09 c08-s2-11 c08-s2-12 c08-s2-13 c08-s2-14 c08-s2-21',
  plcLang: 'c08-s3-02 c08-s3-03 c08-s3-04 c08-s3-05 c08-s3-06 c08-s3-07',
  ladderRule: 'c06-s2-08 c08-s3-12 c08-s3-14 cbt3-57',
  contacts: 'c08-s3-19 c08-s3-20',
  timer: 'c08-s3-21 c08-s3-22',
  counter: 'c08-s3-23 c08-s3-24',
  gates: 'c08-s3-25',
  scan: 'c08-s3-08 c08-s3-11',
  dblCoil: 'c08-s3-13',
  hmiScreen: 'c09-s1-21 c09-s2-03 c09-s2-05 c09-s2-14 cbt1-25',
  hpHmi: 'c09-s1-24 c09-s2-02 c09-s2-06 c09-s2-18 c09-s3-24 cbt2-16',
  meters: 'c10-s2-05 c10-s2-11 c10-s2-14 c10-s2-24 c10-s2-26 cbt1-17',
  meterConn: 'c10-s1-15 c10-s2-02 c10-s2-03 c10-s2-04 c10-s2-07 c10-s2-21 cbt2-21 cbt2-60',
  colorBand: 'c10-s1-11 c10-s1-21 cbt3-26',
  ripple: 'c10-s2-06 c10-s2-09 c10-s2-10 c10-s2-22 c10-s2-27',
  diode: 'c10-s1-04 c10-s2-12 c10-s2-23 cbt3-13 cbt3-39',
  esd: 'c10-s1-08 c10-s1-22 c10-s1-24 c10-s1-28 c10-s1-29 cbt2-47',
  solder: 'c10-s1-06 c10-s1-07 c10-s1-18 cbt1-03',
  sensorSpec: 'c11-s1-03 c11-s1-05 c11-s1-07 c11-s1-10 c11-s2-27 c11-s2-28 cbt3-35',
  sensorChain: 'c03-s1-12 c11-s1-02 c11-s1-15 c11-s2-11 c11-s2-12 c11-s2-13 c11-s2-14 c11-s2-15 c11-s2-16 c11-s2-30 cbt2-30 cbt3-28 cbt3-48',
  photo: 'c11-s1-11 c11-s1-12 c11-s2-19 c11-s2-20 c11-s2-24 c11-s2-25 cbt2-17',
  thermo: 'c11-s2-02 c11-s2-18 cbt1-39 cbt1-52',
  hall: 'c11-s2-05',
  sensorTree: 'c11-s2-23 cbt3-22',
  slip: 'c12-s1-01 c12-s1-03 c12-s1-04 c12-s1-05 c12-s1-07 c12-s1-09 c12-s1-12 c12-s3-14 cbt3-03',
  dcMotor: 'c12-s1-14 cbt1-06',
  dcWinding: 'c12-s1-15 c12-s1-16 c12-s1-17 c12-s1-18 c12-s1-19 c12-s1-20 c12-s1-21 c12-s3-08 c12-s3-12',
  servoStep: 'c12-s1-22 c12-s1-30 c12-s1-31 c12-s1-32 c12-s1-33 c12-s1-34 c12-s1-36 c12-s1-40 c12-s1-41 cbt1-60',
  trip: 'c12-s2-01 c12-s2-03 c12-s2-05 c12-s2-06 c12-s2-07 c12-s2-08 c12-s2-19 c12-s2-21 c12-s2-27 cbt3-55',
  inverter: 'c12-s2-11 c12-s2-13 c12-s2-15 c12-s3-09 c12-s3-10 c12-s3-13 c12-s3-16 c12-s3-19 cbt1-33',
  startCur: 'c12-s3-01 c12-s3-03 c12-s3-06 c12-s3-07',
  reverse: 'cbt2-37',
  pneuSys: 'c13-s1-01 c13-s1-21 cbt2-02 cbt3-19',
  compress: 'c13-s1-03 c13-s1-15 c13-s1-16 cbt3-06',
  pressure: 'c13-s1-05 c13-s1-07 c13-s1-08 c13-s1-17 c13-s1-18 cbt1-10 cbt2-40 cbt3-32',
  gasLaws: 'c13-s1-09 c13-s1-10 cbt1-49 cbt2-27',
  fluidLaws: 'c13-s1-11 c13-s1-12 c13-s1-13 cbt2-53',
  compressors: 'c13-s1-24 c13-s1-25 c13-s1-26 c13-s1-27 c13-s1-28 c13-s1-29 c13-s1-30',
  frl: 'c13-s1-37 c13-s1-38 c13-s1-39 c13-s1-40',
  pilot: 'c13-s1-41 c13-s1-45 c13-s1-59 c13-s2-07 cbt2-14',
  seqv: 'c13-s1-44',
  dirValve: 'c13-s1-47 c13-s1-48 c13-s1-49 c13-s1-58 c13-s2-02 c13-s2-10',
  solenoid: 'c13-s1-50 c13-s2-04',
  shuttle: 'c13-s1-52 c13-s1-53 c13-s2-06',
  cylinder: 'c13-s1-55 c13-s1-56 c13-s1-57 c13-s1-60',
  cylSD: 'c13-s1-61 c13-s1-62 c13-s2-03 cbt3-58',
  meter: 'c13-s2-05',
  quickexh: 'c13-s2-09',
  tri: 'c13-s2-01',
  hold: 'c13-s2-08'
};
/*@@END QFIG@@*/
(function () {
  var by = {};
  Object.keys(window.QFIG).forEach(function (k) { window.QFIG[k].split(' ').forEach(function (i) { by[i] = k; }); });
  /* 문항 아이디 → 그림 키 (없으면 '') */
  window.figKeyOf = function (id) { return by[id] || ''; };
})();
