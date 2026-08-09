import React from 'react';

export default function FormattedText({ text='' }) {
  const parts = text.split(/(<b>.*?<\/b>|<i>.*?<\/i>)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("<b>")) {
          return (
            <strong key={index}>
              {part.replace("<b>", "").replace("</b>", "")}
            </strong>
          );
        }

        if (part.startsWith("<i>")) {
          return (
            <em key={index}>
              {part.replace("<i>", "").replace("</i>", "")}
            </em>
          );
        }
        return part;
      })}
    </>
  );
}