import React from 'react';

// import Loading from '../../globals/Loading';

const StdOut = ({ text }) => {
  return (
    <div>
      {text.split('\n').map((singleLine, idx) => {
          if (singleLine === 'FAILURE') {
            return <div className="fail" key={`stdout-singleline-idx-${idx}`}>{singleLine}</div>;
          } else if (singleLine === 'SUCCESS') {
            return <div className="pass" key={`stdout-singleline-idx-${idx}`}>{singleLine}</div>;
          }

          return <div key={`stdout-singleline-idx-${idx}`}>{singleLine}</div>;
        })}
    </div>
  );
};

export default StdOut;
