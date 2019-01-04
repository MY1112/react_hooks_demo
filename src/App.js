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
            url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2393285531,2392630453&fm=26&gp=0.jpg'
        }, {
            id: 2,
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546578277466&di=ab1b745942432dd8ef2bf9ecb96305e9&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3Df67ecb589758d109c4e3a9b2e158ccd0%2Fc2cec3fdfc039245fda249298294a4c27d1e2584.jpg'
        }, {
            id: 3,
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4260690816,4043361212&fm=26&gp=0.jpg'
        }, {
            id: 4,
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546578349065&di=842aee9c1a15f24219139739dca19685&imgtype=0&src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2015%2F944%2F918%2F2627819449_724000652.jpg'
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

