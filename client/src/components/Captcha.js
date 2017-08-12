import React, {PropTypes} from 'react'
import Recaptcha from 'react-recaptcha'
import {config} from '../../config/mainConfig'

const Captcha = ({ setVerifyRecaptcha}) => {
    const sitekey = config.RECAPTCHA_KEY;

    return (
        <div className='col-md-4 col-md-offset-4 re-captcha g-recaptcha'>
            <Recaptcha
                sitekey={sitekey}
                render='explicit'
                verifyCallback={() => setVerifyRecaptcha(true)}
                onloadCallback={() => {}}
                expiredCallback={() => setVerifyRecaptcha(false)}
            />
        </div>
    )
};

Captcha.propTypes = {
    setVerifyRecaptcha: PropTypes.func.isRequired
};

export default Captcha;