import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Sine } from 'gsap';

import './App.css';

class Photo extends Component {

    componentWillEnter(callback) {
        this.addAnimation(this.enterAnim, {callback: callback})
    }

    componentWillLeave(callback) {
        this.addAnimation(this.leaveAnim, {callback: callback})
    }

    enterAnim = (utils) => {
        const { id } = this.props;
        return new TimelineMax()
            .from(utils.target, 1, {
                x: `+=${( 4 - id ) * 60}px`,
                autoAlpha: 0,
                onComplete: utils.options.callback,
            }, id * 0.7);
    }

    leaveAnim = (utils) => {
        const { id } = this.props;
        return new TimelineMax()
            .to(utils.target, 0.5, {
                scale: 0,
                ease: Sine.easeOut,
                onComplete: utils.options.callback,
            }, (4 - id) * 0.7);
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

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            photos: [{
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
            }]
        };
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const { show, photos } = this.state;

        const renderPhotos = () => {
            return photos.map((item, index) => {
                return <WrappedPhoto id={item.id} url={item.url} key={`photo${item.id}`} />;
            })
        }

        return (
            <div className="demo-hook">
                <button onClick={this.toggle}>toggle</button>
                <TransitionGroup component="div">
                    {show && renderPhotos()}
                </TransitionGroup>
            </div>
        );
    }
}
