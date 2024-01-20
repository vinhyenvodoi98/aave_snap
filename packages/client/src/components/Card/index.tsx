import { ReactNode } from "react";

interface Card {
  title: string
  content: string
  button?: ReactNode;
}

export default function Card({title, content, button} : Card) {
  return (
    <div className="card h-max bg-[#1e2832] border-[#00BFA5] border-b border-l">
      <div className="card-body text-left gap-6 flex flex-col justify-between ">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div>
          {button}
        </div>
      </div>
    </div>
  )
}