import { memo } from 'react';
import './Tag.css';

const Tag = ({ tag, selected, onClick }) => (
    <div
        key={tag}
        className={`tag ${selected ? 'selected' : ''}`}
        onClick={onClick}
    >
        {tag}
    </div>
);

export default memo(Tag);