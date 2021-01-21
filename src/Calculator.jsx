import { useState, useMemo, useRef } from 'react';
import calcItems from './data';

const error = 'Error';

function Calculator() {
  const inpRef = useRef(null);
  const [inpValue, setInpValue] = useState('0');

  const onCalcItemClick = item => {
    let newInpValue = '';

    switch (item.type) {
      case 'X':
        newInpValue = `${inpValue.slice(0, inpValue.length -  1)}`;
        break;
      case 'C':
        newInpValue = '0';
        break;
      default:
        newInpValue = `${inpValue}${item.type}`;
    }

    setInpValue(newInpValue);
    inpRef.current.focus();
  }

  const showedValue = useMemo(() => {

    try {
      const res = eval(inpValue);

      if (typeof res !== 'number' && !res) return error;

      return `= ${res}`;
    } catch (err) {
      return error;
    }
  }, [inpValue])

  return (
    <div className="main">
      <div className="calc-main">
        <div className="calc-text-main">
          <div className="calc-text">
            <textarea
              ref={inpRef}
              className="input-text"
              value={inpValue}
              onChange={e => setInpValue(e.target.value)}
            />
            <p className={`calc-result-text ${showedValue === error ? 'err' : ''}`}>{showedValue}</p>
          </div>
        </div>
        <div className="calc-items">
          {calcItems.map(item =>
            <div
              key={item.id}
              className={`calc-item ${item.className || ''}-item`}
              onClick={() => onCalcItemClick(item)}
            >
              {item.value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
