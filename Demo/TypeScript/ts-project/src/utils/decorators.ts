/*
 *  Description:  
 *  Author: LuckRain7
 *  Date: 2020-04-14 11:17:28
 */

//  接收一个需要装饰的东西
export const scrollFy = <T>() => (target): T => {
    console.log('target:::::', target.prototype);
    if (target.prototype.onReachBottom) {

        target.prototype.beforeCreate = function () {
            console.log(1);

            window.addEventListener("scroll", () => {
                const computeDistance = () => {
                    return (
                        document.body.clientHeight - window.scrollY - window.screen.height
                    );
                };
                const THERTHHOLD = 100;
                if (computeDistance() < THERTHHOLD) {
                    console.log("加载");
                }
            });
        }
    }
    return target
}

const itemActions = {

    // 重写的快乐
    beforeCreate() {
        console.log('created::::');
        const originRender = this.$options.render
        this.$options.render = function (createElement, hack) {
            const vNode = originRender.call(this, createElement, hack)
            return createElement(
                'section',
                {},
                vNode.children.concat(createElement(
                    'div',
                    {
                        on: {
                            click: this.closeAction
                        }
                    },
                    'x'
                ))
            )
        }
    },

    closeAction() {
        console.log("closeAction");
    },

    skipActions() {
        console.log("skipActions");
    }

}


export const itemFy = (target) => {
    Object.assign(target.prototype, itemActions)
    return target
}