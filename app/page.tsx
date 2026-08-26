'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const playStoreUrl = 'https://play.google.com/store/apps/details?id=xyz.littlebrother.nearbrun';
const appStoreUrl = 'https://apps.apple.com/kr/app/id6757452112';

type Locale = 'ko' | 'en' | 'ja';

const copy = {
  ko: {
    nav: ['주요 기능', '앱 화면', '안전과 데이터', '앱 받기'], titleA: '지금 위치에서', titleB: '달리기 좋은 경로', titleC: '를 찾아줘요',
    hero: '거리와 보행 환경을 함께 비교해 달릴 수 있는 경로를 추천하고, 기록부터 분석까지 오늘의 러닝을 한곳에 남겨요.',
    play: 'Google Play에서 받기', app: 'App Store에서 받기', note: '무료로 시작 · 내 위치에서 바로 추천 · 러닝 기록 저장',
    chipA: '3km · 내 위치에서 시작', chipB: '실제로 뛸 수 있는 도로 확인',
    trust: [['현재 위치', '에서 바로 시작'], ['왕복 경로', '로 편안하게 복귀'], ['러닝 기록', '을 한눈에 확인'], ['건강 앱', '과 선택적으로 연동']],
    featureTitle: ['출발 전 고민은 줄이고,', '달리는 순간에 집중하세요'],
    features: [['내 위치에서 경로 찾기', '출발지를 따로 입력하지 않아도 현재 위치와 원하는 거리를 기준으로 달리기 좋은 경로를 찾아요.'], ['반환점까지 왕복 안내', '멀리 낯선 곳으로 빠지지 않도록 출발지로 돌아오는 왕복 경로를 중심으로 안내해요.'], ['6개 지표로 기록하기', '거리, 시간, 평균 페이스, 칼로리, 걸음 수, 고도 정보를 한 화면에서 확인해요.'], ['기록을 성장으로 연결', '러닝 결과와 경로를 차곡차곡 남기고 지난 기록과 비교하며 다음 달리기를 준비해요.']],
    flowTitle: ['추천부터 기록까지', '하나의 흐름으로'], flowCopy: '경로를 찾고, 달리고, 결과를 확인하는 과정이 끊기지 않도록 만들었어요.',
    screens: [['경로 추천', '거리와 현재 위치를 기준으로 추천'], ['러닝 중', '경로와 여섯 가지 지표를 실시간 확인'], ['러닝 완료', '오늘의 기록을 한눈에 정리']],
    buddyTitle: ['혼자 달려도', '혼자인 것 같지 않게'], buddy: 'NearbRun은 거창한 목표보다 오늘 한 번 더 나가는 마음을 응원해요. 가까운 곳에서 시작해 나만의 페이스로 달려보세요.',
    safetyTitle: ['추천은 똑똑하게,', '결정은 안전하게'], safetyLead: '경로 추천과 기록에 필요한 정보만 목적에 맞게 사용합니다.',
    safety: [['실제 도로 상황 우선', '추천 경로는 참고 정보예요. 공사, 날씨, 교통과 현장 안내를 먼저 확인해 주세요.'], ['위치는 러닝에만', '위치 정보는 경로 추천과 러닝 기록을 위해 사용하며, 권한은 기기 설정에서 언제든 변경할 수 있어요.'], ['건강 연동은 선택', 'Health Connect와 Apple 건강 연동은 선택 사항이며, 허용한 경우 완료된 활동 기록을 저장해요.']],
    medical: 'NearbRun은 의료 서비스가 아니며, 건강 상태에 따라 무리하지 않는 범위에서 이용해 주세요.',
    ctaTitle: ['오늘은 어디로', '달려볼까요?'], cta: 'NearbRun을 열고 지금 위치에서 새로운 러닝을 시작하세요.',
    footer: ['고객지원', '개인정보처리방침', '이용약관', '계정 삭제', '문의하기'], mobile: 'NearbRun 앱 받기', alt: '달리는 NearbRun 캐릭터',
  },
  en: {
    nav: ['Features', 'App', 'Safety & data', 'Get the app'], titleA: 'Find a great route', titleB: 'from where you are', titleC: '',
    hero: 'Compare distance and pedestrian-friendly conditions, discover a route you can run, and keep everything from tracking to insights in one place.',
    play: 'Get it on Google Play', app: 'Download on the App Store', note: 'Free to start · Routes from your location · Running history',
    chipA: '3 km · Starts near you', chipB: 'Check real, runnable roads',
    trust: [['Your location', 'Start right away'], ['Round trips', 'Return with confidence'], ['Run history', 'See it at a glance'], ['Health apps', 'Optional connection']],
    featureTitle: ['Spend less time planning.', 'Focus on your run.'],
    features: [['Find routes near you', 'Choose a distance and NearbRun finds a route from your current location—no separate starting point needed.'], ['Round-trip guidance', 'Routes are designed to bring you back to where you started instead of leaving you far from home.'], ['Track six key metrics', 'See distance, time, average pace, calories, steps, and elevation together.'], ['Turn history into progress', 'Save every route and result, compare past runs, and get ready for the next one.']],
    flowTitle: ['From route discovery', 'to a complete record'], flowCopy: 'Find a route, run it, and review your results in one uninterrupted flow.',
    screens: [['Route discovery', 'Recommendations by distance and location'], ['During your run', 'Route and six live metrics'], ['Run complete', 'Your result at a glance']],
    buddyTitle: ['Run solo,', 'never feel alone'], buddy: 'NearbRun celebrates showing up today more than chasing a huge goal. Start nearby and run at your own pace.',
    safetyTitle: ['Smart recommendations.', 'Safer decisions.'], safetyLead: 'We use only the information needed to recommend and record your run.',
    safety: [['Real-world conditions first', 'Routes are suggestions. Always follow closures, weather, traffic, and local signs.'], ['Location is for running', 'Location supports route suggestions and run tracking. You can change permission in device settings anytime.'], ['Health sync is optional', 'Health Connect and Apple Health are optional. With permission, NearbRun saves completed workout records.']],
    medical: 'NearbRun is not a medical service. Exercise within a range appropriate for your health and fitness.',
    ctaTitle: ['Where will you', 'run today?'], cta: 'Open NearbRun and start a new run from where you are.',
    footer: ['Support', 'Privacy', 'Terms', 'Delete account', 'Contact'], mobile: 'Get the NearbRun app', alt: 'NearbRun running character',
  },
  ja: {
    nav: ['主な機能', 'アプリ画面', '安全とデータ', 'アプリを入手'], titleA: '今いる場所から', titleB: '走りやすいルート', titleC: 'を見つけよう',
    hero: '距離と歩行環境を比較して走りやすいルートを提案。記録から分析まで、今日のランニングをひとつにまとめます。',
    play: 'Google Playで入手', app: 'App Storeからダウンロード', note: '無料でスタート · 現在地から提案 · ランニングを記録',
    chipA: '3km · 現在地からスタート', chipB: '実際に走れる道路を確認',
    trust: [['現在地', 'からすぐスタート'], ['往復ルート', 'で安心して戻る'], ['ランニング記録', 'をひと目で確認'], ['ヘルスケア', 'と任意で連携']],
    featureTitle: ['走る前の迷いを減らして、', 'ランニングに集中しよう'],
    features: [['現在地からルート検索', '出発地を入力せず、現在地と希望距離をもとに走りやすいルートを探します。'], ['折り返しの往復案内', '遠く離れた場所で終わらないよう、出発地点へ戻る往復ルートを中心に案内します。'], ['6つの指標を記録', '距離、時間、平均ペース、カロリー、歩数、標高をひとつの画面で確認できます。'], ['記録を成長につなげる', 'ルートと結果を保存し、過去のランと比較して次のランニングに備えられます。']],
    flowTitle: ['ルート提案から記録まで', 'ひとつの流れで'], flowCopy: 'ルート検索、ランニング、結果確認まで途切れない体験を届けます。',
    screens: [['ルート提案', '距離と現在地をもとに提案'], ['ランニング中', 'ルートと6つの指標をリアルタイム表示'], ['ランニング完了', '今日の記録をひと目で確認']],
    buddyTitle: ['ひとりで走っても、', 'ひとりじゃない'], buddy: 'NearbRunは大きな目標より、今日もう一度外へ出る気持ちを応援します。近くから、自分のペースで走りましょう。',
    safetyTitle: ['提案はスマートに、', '判断は安全に'], safetyLead: 'ルート提案と記録に必要な情報だけを、目的に合わせて使用します。',
    safety: [['実際の道路状況を優先', '提案ルートは参考情報です。工事、天候、交通、現地の案内を優先してください。'], ['位置情報はランニングに', '位置情報はルート提案と記録に使用します。権限は端末設定からいつでも変更できます。'], ['ヘルス連携は任意', 'Health ConnectとAppleヘルスケアの連携は任意です。許可した場合、完了した運動記録を保存します。']],
    medical: 'NearbRunは医療サービスではありません。健康状態に合わせ、無理のない範囲でご利用ください。',
    ctaTitle: ['今日はどこへ', '走りますか？'], cta: 'NearbRunを開いて、今いる場所から新しいランニングを始めましょう。',
    footer: ['サポート', 'プライバシー', '利用規約', 'アカウント削除', 'お問い合わせ'], mobile: 'NearbRunアプリを入手', alt: '走るNearbRunキャラクター',
  },
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>('ko');
  const t = copy[locale];
  const features = t.features.map((item, index) => [`0${index + 1}`, ...item]);
  const screens = ['/app-recommend.png', '/app-tracking.png', '/app-result.png'].map((src, index) => [src, ...t.screens[index]]);

  useEffect(() => {
    const saved = window.localStorage.getItem('nearbrun-locale') as Locale | null;
    if (saved && copy[saved]) {
      queueMicrotask(() => setLocale(saved));
      return;
    }
    void (async () => {
      const response = await fetch('/api/locale');
      const data = await response.json() as { locale?: Locale };
      if (data.locale && copy[data.locale]) setLocale(data.locale);
    })().catch(() => undefined);
  }, []);

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  const chooseLocale = (next: Locale) => {
    setLocale(next);
    window.localStorage.setItem('nearbrun-locale', next);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NearbRun 홈">
          <Image src="/nearbrun-icon.png" width={44} height={44} alt="" priority />
          <span>NearbRun</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#features">{t.nav[0]}</a>
          <a href="#experience">{t.nav[1]}</a>
          <a href="#safety">{t.nav[2]}</a>
          <div className="language-switch" aria-label="Language">{(['ko', 'en', 'ja'] as Locale[]).map((item) => <button className={locale === item ? 'active' : ''} onClick={() => chooseLocale(item)} key={item}>{item.toUpperCase()}</button>)}</div>
          <a className="nav-download" href="#download">{t.nav[3]}</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">START NEARBY. RUN YOUR WAY.</p>
          <h1>{t.titleA}<br /><span>{t.titleB}</span>{t.titleC}</h1>
          <p className="hero-description">{t.hero}</p>
          <div className="store-actions" aria-label="앱 다운로드">
            <a className="store-button primary" href={playStoreUrl} target="_blank" rel="noreferrer">
              <small>ANDROID</small><strong>{t.play}</strong>
            </a>
            <a className="store-button" href={appStoreUrl} target="_blank" rel="noreferrer">
              <small>IPHONE</small><strong>{t.app}</strong>
            </a>
          </div>
          <p className="hero-note">{t.note}</p>
        </div>

        <div className="hero-visual" aria-label="NearbRun 앱 경로 추천 화면">
          <div className="mint-orbit orbit-one" />
          <div className="mint-orbit orbit-two" />
          <div className="character-card">
            <Image src="/nearbrun-character-v3.png" width={1254} height={1254} alt={t.alt} priority />
          </div>
          <div className="phone-shell">
            <Image src="/app-recommend.png" width={944} height={2048} alt="NearbRun 맞춤 경로 추천 화면" priority />
          </div>
          <div className="route-chip route-chip-top">{t.chipA}</div>
          <div className="route-chip route-chip-bottom"><span /> {t.chipB}</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="핵심 기능 요약">
        {t.trust.map(([title, text]) => <p key={title}><strong>{title}</strong><span>{text}</span></p>)}
      </section>

      <section className="features section" id="features">
        <div className="section-heading">
          <p className="eyebrow">RUNNING, MADE SIMPLE</p>
          <h2>{t.featureTitle[0]}<br />{t.featureTitle[1]}</h2>
        </div>
        <div className="feature-list">
          {features.map(([number, title, description]) => (
            <article className="feature-row" key={number}>
              <span className="feature-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="section experience-heading">
          <div className="section-heading light">
            <p className="eyebrow">ONE RUN, ONE FLOW</p>
            <h2>{t.flowTitle[0]}<br />{t.flowTitle[1]}</h2>
          </div>
          <p className="experience-copy">{t.flowCopy}</p>
        </div>
        <div className="screen-grid">
          {screens.map(([src, title, description], index) => (
            <article className={`screen-card screen-${index + 1}`} key={src}>
              <div className="screen-phone">
                <Image src={src} width={944} height={2048} alt={`NearbRun ${title} 화면`} />
              </div>
              <p><strong>{title}</strong><span>{description}</span></p>
            </article>
          ))}
        </div>
      </section>

      <section className="buddy section">
        <div className="buddy-art">
          <div className="buddy-circle" />
          <Image src="/nearbrun-character-v3.png" width={1254} height={1254} alt={t.alt} />
        </div>
        <div className="buddy-copy">
          <p className="eyebrow">YOUR RUNNING BUDDY</p>
          <h2>{t.buddyTitle[0]}<br />{t.buddyTitle[1]}</h2>
          <p>{t.buddy}</p>
        </div>
      </section>

      <section className="safety section" id="safety">
        <div className="section-heading centered">
          <p className="eyebrow">RUN INFORMED</p>
          <h2>{t.safetyTitle[0]}<br />{t.safetyTitle[1]}</h2>
          <p>{t.safetyLead}</p>
        </div>
        <div className="safety-grid">
          {t.safety.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
        <p className="health-note">{t.medical}</p>
      </section>

      <section className="final-cta" id="download">
        <div>
          <p className="eyebrow">YOUR NEXT RUN STARTS HERE</p>
          <h2>{t.ctaTitle[0]}<br />{t.ctaTitle[1]}</h2>
          <p>{t.cta}</p>
          <div className="store-actions">
            <a className="store-button primary" href={playStoreUrl} target="_blank" rel="noreferrer"><small>ANDROID</small><strong>{t.play}</strong></a>
            <a className="store-button" href={appStoreUrl} target="_blank" rel="noreferrer"><small>IPHONE</small><strong>{t.app}</strong></a>
          </div>
        </div>
        <Image src="/nearbrun-character-v3.png" width={1254} height={1254} alt={t.alt} />
      </section>

      <footer>
        <div className="footer-brand"><Image src="/nearbrun-icon.png" width={42} height={42} alt="" /><strong>NearbRun</strong></div>
        <div className="footer-links">
          <a href="https://support.nearbrun.com/">{t.footer[0]}</a>
          <a href="https://support.nearbrun.com/privacy">{t.footer[1]}</a>
          <a href="https://support.nearbrun.com/terms">{t.footer[2]}</a>
          <a href="https://support.nearbrun.com/account-deletion">{t.footer[3]}</a>
          <a href="mailto:support@nearbrun.com">{t.footer[4]}</a>
        </div>
        <p>© 2026 NearbRun. All rights reserved.</p>
      </footer>

      <a className="mobile-download" href="#download">{t.mobile}</a>
    </main>
  );
}
