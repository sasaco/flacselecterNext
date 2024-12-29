import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputData, InputDataService } from '../services/inputData';
import { setEnable } from '../utils/setEnable';
import '../styles/input-page.css';

// Add type declarations for event handlers
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function InputPage() {
  const router = useRouter();
  const inputService = new InputDataService();
  const [data, setData] = useState<InputData>(inputService.Data);
  const [enableState, setEnableState] = useState(setEnable(data));

  useEffect(() => {
    setEnableState(setEnable(data));
  }, [data]);

  const tunnelKeizyoList = [
    { id: 1, title: '単線' },
    { id: 2, title: '複線' },
    { id: 3, title: '新幹線（在来工法）' },
  ];

  const invertList = [
    { id: 0, title: 'なし' },
    { id: 1, title: 'あり' },
  ];

  const haimenKudoList = [
    { id: 0, title: 'なし' },
    { id: 1, title: 'あり' },
  ];

  const henkeiModeList = [
    { id: 1, title: '側壁全体押出し' },
    { id: 2, title: '側壁上部前傾' },
    { id: 3, title: '脚部押出し' },
    { id: 4, title: '盤ぶくれ' },
  ];

  const uragomeChunyukoList = [
    { id: 0, title: 'なし' },
    { id: 1, title: 'あり' },
  ];

  const lockBoltKouList = [
    { id: 0, title: 'なし' },
    { id: 4, title: '4本' },
    { id: 8, title: '8本' },
    { id: 12, title: '12本' },
  ];

  const downwardLockBoltKouList = [
    { id: 0, title: 'なし' },
    { id: 4, title: '4本' },
    { id: 6, title: '6本' },
  ];

  const uchimakiHokyoList = [
    { id: 0, title: 'なし' },
    { id: 1, title: 'あり' },
  ];

  const lockBoltLengthList = [
    { id: 3, title: '3m' },
    { id: 6, title: '6m' },
    { id: 4, title: '4m' },
    { id: 8, title: '8m' },
  ];

  const downwardLockBoltLengthList = [
    { id: 3, title: '3m' },
    { id: 4, title: '4m' },
    { id: 6, title: '6m' },
  ];

  const handleChange = (field: keyof InputData, value: number): void => {
    setData((prev: InputData) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page-container">
      <div className="header">
        <img src="/img/logo.png" alt="Logo" />
        <div>
          <h1>変状対策工設計ツール</h1>
          <span className="version">Ver.2.1.1</span>
        </div>
      </div>
      <form onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        inputService.Data = data;
        localStorage.setItem('inputData', JSON.stringify(data));
        await router.push('/output-page');
      }}>
        <div className="container">
          <div className="section-title">
            <h2>構造条件</h2>
            <div className="divider"></div>
          </div>
      </div>

      <div className="container conditions">
        <div className="liner">
          <fieldset>
            <legend>トンネル形状</legend>
            {tunnelKeizyoList.map((x) => (
              <div key={x.id}>
                <label>
                  <input
                    type="radio"
                    name="tunnelKeizyo"
                    checked={data.tunnelKeizyo === x.id}
                    onChange={() => handleChange('tunnelKeizyo', x.id)}
                  />
                  {x.title}
                </label>
              </div>
            ))}
          </fieldset>

          <fieldset>
            <legend>覆工巻厚</legend>
            <div id="textbox">
              <input
                type="number"
                value={data.fukukouMakiatsu}
                onChange={(e: InputEvent) => handleChange('fukukouMakiatsu', Number(e.target.value))}
                style={{ width: '65px', textAlign: 'center' }}
                min="30"
                max="70"
              />
              cm
            </div>
          </fieldset>

          <fieldset>
            <legend>インバートの有無</legend>
            {invertList.map((x) => (
              <div key={x.id}>
                <label>
                  <input
                    type="radio"
                    name="invert"
                    checked={data.invert === x.id}
                    onChange={() => handleChange('invert', x.id)}
                  />
                  {x.title}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
      </div>

      <div className="container">
        <div className="section-title">
          <h2 className="section-title">調査・計測結果の条件</h2>
          <div className="divider"></div>
        </div>
      </div>

      <div className="container conditions">
        <div className="liner">
          <fieldset>
            <legend>背面空洞の有無</legend>
            {haimenKudoList.map((x) => (
              <div key={x.id}>
                <label>
                  <input
                    type="radio"
                    name="haimenKudo"
                    checked={data.haimenKudo === x.id}
                    onChange={() => handleChange('haimenKudo', x.id)}
                  />
                  {x.title}
                </label>
              </div>
            ))}
          </fieldset>

          <fieldset>
            <legend>変形モード</legend>
            {henkeiModeList.map((x) => (
              <div key={x.id}>
                <label>
                  <input
                    type="radio"
                    name="henkeiMode"
                    checked={data.henkeiMode === x.id}
                    onChange={() => handleChange('henkeiMode', x.id)}
                    disabled={enableState.henkeiModeStyle[x.id - 1] !== 'Enable'}
                  />
                  {x.title}
                </label>
              </div>
            ))}
          </fieldset>

          <fieldset>
            <legend>地山強度</legend>
            <div id="textbox">
              <input
                type="number"
                value={data.jiyamaKyodo}
                onChange={(e: InputEvent) => handleChange('jiyamaKyodo', Number(e.target.value))}
                style={{ width: '65px', textAlign: 'center' }}
                min="2"
                max="8"
              />
              MPa
            </div>
          </fieldset>

          <fieldset>
            <legend>内空変位速度, 盤ぶくれ速度</legend>
            <div id="textbox">
              <input
                type="number"
                value={data.naikuHeniSokudo}
                onChange={(e: InputEvent) => handleChange('naikuHeniSokudo', Number(e.target.value))}
                style={{ width: '65px', textAlign: 'center' }}
              />
              mm/年
              <button type="button" onClick={() => console.log('モニタリングデータ取得')}>モニタリングデータ取得</button>
              <div>
                <pre>{''}</pre>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="container">
        <div className="section-title">
          <h2 className="section-title">対策工の条件</h2>
          <div className="divider"></div>
        </div>
      </div>

      <div className="container conditions">
        <div className="liner">
          <fieldset>
            <legend>裏込注入工</legend>
            {uragomeChunyukoList.map((x) => (
              <div key={x.id}>
                <label>
                  <input
                    type="radio"
                    name="uragomeChunyuko"
                    checked={data.uragomeChunyuko === x.id}
                    onChange={() => handleChange('uragomeChunyuko', x.id)}
                    disabled={enableState.uragomeChunyukoStyle[x.id] !== 'Enable'}
                  />
                  {x.title}
                </label>
              </div>
            ))}
          </fieldset>

          <fieldset>
            <legend>ロックボルト工</legend>
            <div className="liner">
              <div>
                {lockBoltKouList.map((x) => (
                  <div key={x.id}>
                    <label>
                      <input
                        type="radio"
                        name="lockBoltKou"
                        checked={data.lockBoltKou === x.id}
                        onChange={() => handleChange('lockBoltKou', x.id)}
                        disabled={enableState.henkeiMode4Flag}
                      />
                      {x.title}
                    </label>
                  </div>
                ))}
              </div>
              <div className="margin-left">
                {lockBoltLengthList.map((x) => (
                  <div key={x.id}>
                    <label>
                      <input
                        type="radio"
                        name="lockBoltLength"
                        checked={data.lockBoltLength === x.id}
                        onChange={() => handleChange('lockBoltLength', x.id)}
                        disabled={data.lockBoltKou === 0}
                      />
                      {x.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>ロックボルト工（下向き）</legend>
            {enableState.downwardLockBoltEnable ? (
              <div className="liner">
                <div>
                  {downwardLockBoltKouList.map((x) => (
                    <div key={x.id}>
                      <label>
                        <input
                          type="radio"
                          name="downwardLockBoltKou"
                          checked={data.downwardLockBoltKou === x.id}
                          onChange={() => handleChange('downwardLockBoltKou', x.id)}
                        />
                        {x.title}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="margin-left">
                  {downwardLockBoltLengthList.map((x) => (
                    <div key={x.id}>
                      <label>
                        <input
                          type="radio"
                          name="downwardLockBoltLength"
                          checked={data.downwardLockBoltLength === x.id}
                          onChange={() => handleChange('downwardLockBoltLength', x.id)}
                          disabled={enableState.downwardLockBoltLengthStyle !== 'Enable'}
                        />
                        {x.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>選択できません</p>
            )}
          </fieldset>

          <fieldset>
            <legend>内巻補強</legend>
            {uchimakiHokyoList.map((x) => (
              <div key={x.id}>
                <label>
                  <input
                    type="radio"
                    name="uchimakiHokyo"
                    checked={data.uchimakiHokyo === x.id}
                    onChange={() => handleChange('uchimakiHokyo', x.id)}
                    disabled={enableState.henkeiMode4Flag}
                  />
                  {x.title}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
      </div>
    </form>
    </div>
  );
}
