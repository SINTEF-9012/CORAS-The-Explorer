import React from 'react';

import './keypoints.css';

const keyPointData= [
    {
        header: "Key Point 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac nisl quis massa mattis sodales. Donec sed posuere lorem. Nam scelerisque erat sed est venenatis pulvinar. Nullam quis nisi non odio egestas aliquam non vitae dolor. Quisque urna elit, bibendum posuere ligula et, scelerisque mattis odio. Donec consectetur libero ut tristique vestibulum. Quisque ut viverra metus. Sed tempus felis vel libero blandit posuere id vel nunc. Maecenas ac placerat justo, id tincidunt urna. Etiam scelerisque, sem ac eleifend dignissim, tortor ipsum porta erat, efficitur interdum odio lacus in quam. Phasellus eu sem leo. Sed ut nisl feugiat lectus ultricies scelerisque et ac eros. Vestibulum fringilla tempor nisi sit amet cursus. Nam a tristique nibh, feugiat finibus ante. Vivamus et rhoncus sem, ut fringilla libero.",
        link: "#"
    },
    {
        header: "Key Point 2",
        text: "Integer convallis erat non mi imperdiet feugiat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce cursus elit at interdum scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut maximus lacinia mauris a ornare. In enim nunc, faucibus at sodales sit amet, sagittis nec nisi. Ut a metus vulputate, tincidunt magna sit amet, facilisis turpis. Morbi et rutrum eros. Maecenas quam diam, cursus sit amet magna eget, tristique vestibulum lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed turpis felis, consequat vel metus non, lacinia viverra mauris.",
        link: "#"
    },
    {
        header: "Key Point 3",
        text: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse a imperdiet turpis. Mauris egestas semper velit, eget commodo enim consectetur vitae. Ut auctor, est vitae tristique efficitur, metus turpis venenatis tortor, sagittis aliquam turpis nisi sed enim. Cras porta at dolor in efficitur. Maecenas sollicitudin cursus commodo. Integer venenatis, tellus non elementum commodo, lectus magna elementum lorem, vel ultrices erat dolor eu tellus. Sed eget ante faucibus, facilisis risus iaculis, lacinia nisl. Nullam in massa quis erat suscipit cursus. Curabitur at feugiat urna, ut imperdiet odio.",
        link: "#"
    }
]

const KeyPoint = ({ header, text, link }) =>
    <div className="key-point">
        <header>
            <h1 className="key-point__header">{header}</h1>
        </header>
        <p className="key-point__description">
            {text}
        </p>
        <a className="key-point__read-more-link" href={link}>Read more <span className="icon-push-down icon-circle-right"></span></a>
    </div>

const KeyPoints = (props) =>
    <div className="key-points">
        {keyPointData.map((val, key) => <KeyPoint header={val.header} text={val.text} link={val.link} key={key} />)}
    </div>

export default KeyPoints;