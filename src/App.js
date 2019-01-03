import React, { Component, useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Sine } from 'gsap';

import './App.css';

function enterAnim(props, utils) {
    const { id } = props
    return new TimelineMax()
            .from(utils.target, 1, {
                x: `+=${( 4 - id ) * 60}px`,
                autoAlpha: 0,
                onComplete: utils.options.callback
            }, id * 0.7);
}

function leaveAnim(props, utils) {
    const { id } = props
        return new TimelineMax()
            .to(utils.target, 0.5, {
                scale: 0,
                ease: Sine.easeOut,
                onComplete: utils.options.callback,
            }, (4 - id) * 0.5);
}

class Photo extends Component {

    componentWillEnter(callback) {
        this.addAnimation(enterAnim.bind(this, this.props), {callback: callback})
    }

    componentWillLeave(callback) {
        this.addAnimation(leaveAnim.bind(this, this.props), {callback: callback})
    }

    render() {
        const { url } = this.props;
        return (
            <div className="photo">
                <img src={url} alt={url}/>
            </div>
        )
    }
}

const WrappedPhoto = GSAP()(Photo);

function getSize() {
    return {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
    };
}

function useWindowSize() {
    let [windowSize, setWindowSize] = useState(getSize());
  
    function handleResize() {
        setWindowSize(getSize());
    }
  
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
  
    return windowSize;
}
  
export default function App()  {
    const [show, setShow] = useState(false)
    const photos = [{
            id: 1,
            url: 'http://img4.imgtn.bdimg.com/it/u=1032683424,3204785822&fm=214&gp=0.jpg'
        }, {
            id: 2,
            url: 'http://scimg.jb51.net/allimg/160714/103-160G40912112a.jpg'
        }, {
            id: 3,
            url: 'http://img.name2012.com/uploads/allimg/180430/233223B52-2.jpg'
        }, {
            id: 4,
            url: 'http://img4.imgtn.bdimg.com/it/u=360498760,1598118672&fm=27&gp=0.jpg'
        }];

    const renderPhotos = () => {
        return photos.map((item, index) => {
            return <WrappedPhoto id={item.id} url={item.url} key={`photo${item.id}`} />;
        })
    }

    const windowSize = useWindowSize()


    return (
        <div>
            <div className="demo-hook">
                <button onClick={() => setShow(!show)}>Jump Egg</button>
                <TransitionGroup component="div">
                    {show && renderPhotos()}
                </TransitionGroup>
            </div>
            <div className="demo-hook-2">
                <p>innerHeight:{windowSize.innerHeight}</p>
                <p>innerWidth:{windowSize.innerWidth}</p>
                <p>outerHeight:{windowSize.outerHeight}</p>
                <p>outerWidth:{windowSize.outerWidth}</p>
            </div>
        </div>
    );
}

