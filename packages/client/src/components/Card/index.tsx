import { ReactNode } from 'react';

interface Card {
  title: string;
  content: string;
  button?: ReactNode;
}

export default function Card({ title, content, button }: Card) {
  return (
    <div className='card h-max border-b border-l border-[#00BFA5] bg-[#1e2832]'>
      <div className='card-body flex flex-col justify-between gap-6 text-left '>
        <h2 className='card-title'>{title}</h2>
        <p>{content}</p>
        <div>{button}</div>
      </div>
    </div>
  );
}
