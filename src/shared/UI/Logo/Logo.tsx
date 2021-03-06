import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { useDispatch } from 'react-redux';

import { Actions as menuActions } from '../../../state/menu/actions';

interface Props {
  classes?: string;
}

const Logo: React.FC<Props> = ({ classes }) => {
  const dispatch = useDispatch();
  //  MAIN LOGO IMAGE
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fixed(width: 40, height: 40) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const toHome = () => {
    dispatch(menuActions.closeMenu());
  };

  return (
    <div className={classes} onClick={toHome}>
      <Link to='/' style={{ color: 'transparent' }}>
        <Img fixed={data.file.childImageSharp.fixed} alt='yokino logo' />
      </Link>
    </div>
  );
};

export default Logo;
