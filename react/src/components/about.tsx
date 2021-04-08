import React from 'react';

export class AboutComponent extends React.Component {
    render() {
        return (
            <div>
                <p>The Naming Rule Management(React Version) is a project for learning react. It's built by
                    react-scripts with react, react-router-dom, react-redux, TypeScript. </p>
                <p>
                    It has two repositories, the GitHub one is at
                    <a href='https://github.com/ckvip/naming-rule'
                       target='github'> https://github.com/ckvip/naming-rule</a>, and it has a
                    <a href='https://ckvip.github.io/naming-rule' target='demo'> live demo</a>.
                </p>
                <p>
                    The other one is on Gitee.com in China at
                    <a href='https://gitee.com/yoso2020/naming-rule'
                       target='gitee'> https://gitee.com/yoso2020/naming-rule</a>, it has a
                    <a href='https://yoso2020.gitee.io/naming-rule' target='demo'> live demo</a> too.
                </p>
            </div>
        );
    }
}
