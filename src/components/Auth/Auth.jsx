import { Link } from "react-router-dom";
import logo from '../../images/logo.svg'
import './Auth.css';

function Auth({ children, title, buttonText, question, linkText, link, onSubmit, isDisabled, isLoading }) {
    
    return (
        <div className='auth'>
            <div className="auth__forma">
                <Link to='/' className='auth__logo'>
                    <img src={logo} alt='Логотип проекта' />
                </Link>
                <h3 className='auth__title'>{title}</h3>
                <form className='auth__form' onSubmit={onSubmit} noValidate>
                    {children}
                    <button className="auth__submit-button" type="submit" disabled={isDisabled || isLoading ? true : false}>
                        {buttonText}
                    </button>
                </form>
                <p className="auth__text">
                    {question}
                    <Link to={link} className='auth__link'>
                        {linkText}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Auth;