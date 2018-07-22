/**
 * 高阶组件示例。
 *
 * 两种常用方法：
 *    1. 属性代理
 *    2. 反向继承
 *
 * 高阶组件可以做到对组件的控制包括：
 *    1. 控制props
 *    2. 通过refs使用引用
 *    3. 抽象 state
 *    4. 使用其他元素包裹WrappedComponent
 *
 * Created by 仲夏 on 2018/7/22.
 */

import React, {Component, PropTypes} from 'react'
import {Input} from 'antd'


class ScoreInput extends Component {
  method = () => {
    console.log('..method..scoreInput entering...')
  }

  componentDidMount() {
    console.log('ScoreInput didMount')
  }

  render() {
    const {value} = this.props

    return (
      <div>
        <span>成绩：</span>
        <Input style={{width: '250px'}} placeholder="请输入成绩" value={value}/>
      </div>
    )
  }
}

// 属性代理
const wrapComponent = (WrappedComponent) => {
  return class extends Component {
    proc(wrappedComponentInst) {
      console.log('proc: ', wrappedComponentInst)
      wrappedComponentInst.method && wrappedComponentInst.method()
    }

    method = () => {
      console.log('..method entering...')
    }

    componentDidMount() {
      console.log('wrapComponent didMount')
    }

    render() {
      const newProps = {
        text: 'I am a WrappedComponent',
        value: 'I am a WrappedComponent',
        ref: this.proc.bind(this)
      }

      return (
        <WrappedComponent {...this.props} {...newProps} />
      )
    }
  }
}


// 反向继承
const extendedComponent = WrappedComponent => {
  return class extends WrappedComponent {
    render() {
      const {isLogin} = this.props

      if (!isLogin) {
        return <h1>您尚未登录。。。</h1>
      }

      return (
        <div className="extended-wrap">
          <h3>反向继承wrap：</h3>
          {super.render()}
        </div>
      )
    }
  }
}

// 高阶组件传参
function HOCFactory(params={}) {
  return WrappedComponent => {
    return class extends WrappedComponent {
      render() {
        const {isLogin} = params

        if (!isLogin) {
          return <h1>您尚未登录。。。</h1>
        }

        return (
          <div className="extended-wrap">
            <h1>恭喜您，登陆成功：</h1>
            <h3>反向继承wrap：</h3>
            {super.render()}
          </div>
        )
      }
    }
  }
}

// export default wrapComponent(ScoreInput)
// export default extendedComponent(ScoreInput)
export default HOCFactory({isLogin: true})(ScoreInput)