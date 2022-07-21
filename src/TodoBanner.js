import React, { Component } from 'react';

export class TodoBanner extends Component {
    render = () =>
        <div>
            <h4 className="bg-primary text-white text-center p-2">
                {this.props.name}'s Todo List</h4>

            <p className="p-2">( {this.props.tasks.filter(item => !item.done).length} items to do)</p>

        </div>

}