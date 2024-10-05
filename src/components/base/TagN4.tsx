import { Tag } from 'antd';
import React from 'react';

type Props = {
  level: string;
};

export default function TagN4({ level }: Props) {
  return (
    <Tag className="ms-3" color="volcano">
      <span className="text-xl flex justify-center items-center px-2">
        {level}
      </span>
    </Tag>
  );
}
