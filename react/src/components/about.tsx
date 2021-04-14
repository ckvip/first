import React from 'react';
import './about.css';

export class AboutComponent extends React.Component {
    render() {
        return (
            <div>
                <p>The Naming Rule Management is a project for learning react and Vue. It has two versions. </p>
                <p>The react version is built by react-scripts with react 17.x, react-router-dom 5.x, react-redux
                    7.x, TypeScript. </p>
                <p>The Vue version is built by vue/cli with Vue 3.x, Vuex 4.x, Vue router 4.x, TypeScript. </p>
                <table className={'table'}>
                    <tr><th>Version</th><th>Source code</th><th>Live demo</th></tr>
                    <tr>
                        <td>React</td>
                        <td>
                            <p>
                                GitHub: <a href='https://github.com/ckvip/naming-rule/react' target='code'> https://github.com/ckvip/naming-rule/react</a>
                            </p>
                            <p>
                                Gitee: <a href='https://gitee.com/yoso2020/naming-rule/react' target='code'> https://gitee.com/yoso2020/naming-rule/react</a>
                            </p>
                        </td>
                        <td>
                            <p>
                                GitHub: <a href='https://ckvip.github.io/naming-rule/react' target='demo'> https://ckvip.github.io/naming-rule/react</a>
                            </p>
                            <p>
                                Gitee: <a href='https://yoso2020.gitee.io/naming-rule/react' target='demo'> https://yoso2020.gitee.io/naming-rule/react</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Vue</td>
                        <td>
                            <p>
                                GitHub: <a href='https://github.com/ckvip/naming-rule/vue' target='code'> https://github.com/ckvip/naming-rule/vue</a>
                            </p>
                            <p>
                                Gitee: <a href='https://gitee.com/yoso2020/naming-rule/vue' target='code'> https://gitee.com/yoso2020/naming-rule/vue</a>
                            </p>
                        </td>
                        <td>
                            <p>
                                GitHub: <a href='https://ckvip.github.io/naming-rule/vue' target='demo'> https://ckvip.github.io/naming-rule/vue</a>
                            </p>
                            <p>
                                Gitee: <a href='https://yoso2020.gitee.io/naming-rule/vue' target='demo'> https://yoso2020.gitee.io/naming-rule/vue</a>
                            </p>
                        </td>
                    </tr>
                </table>

            </div>
        );
    }
}
