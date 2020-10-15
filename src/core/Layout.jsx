import React from 'react';
import Menu from './Menu'
import '../styles.css'
const Layout = ({ title="titulo" , description="descripcion" ,className,children }) => {
    return ( 
     <div>
         <Menu/>
            <div className="header-web">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>
                {children}
            </div>
     </div>
     );
}
 
export default Layout;