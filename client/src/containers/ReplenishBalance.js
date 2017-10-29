import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-notifications/lib/notifications.css';
import * as userActions from '../actions/UserActions';
import MaskedInput from 'react-text-mask'
import ReactDOM from 'react-dom';

class ReplenishBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectReplenish: 'map'
        }
    }

    format = () => {
        console.log(ReactDOM.findDOMNode(this.refs.name).value);
    };

    render() {
        const { name, balance } = this.props.userInfo;

        return (
            <div className='form-group'>
                <form id='balance-form'>
                    <h3>{name}, ваш баланс: {balance || 0}&#8381;</h3>
                    <div className='balance-border'>
                        <table>
                            <tbody>
                            <tr>
                                <th width='300'>
                                    Сумма пополнения (в рублях)
                                </th>
                                <th>
                                    <input className='form-control'/>
                                </th>
                            </tr>
                            <tr>
                                <th width='300' className='nameRadio'>
                                    Способ пополнения
                                </th>
                                <th className='radio'>
                                    <ul>
                                        <li>
                                            <input onClick={() => this.setState({isSelectReplenish: 'map'})}
                                                   type='radio' defaultChecked name='selectForm'/>
                                            <label><span>банковская карта</span></label>
                                        </li>

                                        <li>
                                            <input onClick={() => this.setState({isSelectReplenish: 'phone'})}
                                                   type='radio' name='selectForm'/>
                                            <label><span>телефон</span></label>
                                        </li>
                                    </ul>
                                </th>
                            </tr>
                            </tbody>
                            {this.state.isSelectReplenish === 'map' ?
                                <tbody>
                                    <tr>
                                        <th>
                                            Реквизиты карты
                                        </th>
                                        <th> </th>
                                    </tr>
                                    <tr>
                                        <td className='subparagraphs'>Номер карты</td>
                                        <td>
                                            <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                                         className='form-control'
                                                         name='map' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='subparagraphs'>Владелец</td>
                                        <td>
                                            <MaskedInput mask={[/^[A-Z]$/]}
                                                   className='form-control'
                                                   onChange={() => this.format()}
                                                   name='name'
                                                   ref='name'/>
                                        </td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                <tr>
                                    <th>
                                        Номер телефона
                                    </th>
                                    <th>
                                        <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                     className='form-control'
                                                     name='phone'
                                                     placeholder='(903) 412-4060'
                                                     ref='phone' />
                                    </th>
                                </tr>
                                </tbody>}

                        </table>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplenishBalance)