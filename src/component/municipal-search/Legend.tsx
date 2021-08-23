/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { Link } from 'gatsby';
import { Info } from 'phosphor-react';

const legendStyle = css`
  width: 10rem;
  height: auto;
  background: ${themeColors.warmGrayTransparent};
  margin: 30vh 2vw;
  padding: 1.5rem 2rem 1.8rem;
  position: absolute;
  z-index: 1;
  right: 0;
`;

const titleStyle = css`
  color: ${themeColors.indigo};
  font-family: ${fonts.calibre};
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
  color: ${themeColors.fontLightGray};
`;

const liStyle = css`
  display: flex;
`;

const circleStyle1 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile1};
`;

const circleStyle2 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile2};
`;

const circleStyle3 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile3};
`;

const circleStyle4 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile4};
`;

const circleStyle5 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile5};
`;

const linkStyle = css`
  display: flex;
  align-items: center;
  font-family: ${fonts.calibre};
  text-decoration: none;
  color: ${themeColors.fontGray};
  transition: 0.3s ease-in-out;
  &:hover {
    color: ${themeColors.gold};
  }
`;

const iconStyle = css`
  padding-right: 3px;
`;

const Legend: React.FC = () => {
    return (
        <div css={legendStyle}>
        <p css={titleStyle}>Quintile</p>
        <ul css={detailListStyle}>
          <li css={liStyle}><span css={circleStyle1}>&#183;</span>First</li>
          <li css={liStyle}><span css={circleStyle2}>&#183;</span>Second</li>
          <li css={liStyle}><span css={circleStyle3}>&#183;</span>Third</li>
          <li css={liStyle}><span css={circleStyle4}>&#183;</span>Fourth</li>
          <li css={liStyle}><span css={circleStyle5}>&#183;</span>Fifth</li>
        </ul>
        <Link css={linkStyle} to="/about">
          <Info size={20} css={iconStyle} />
          More Info
        </Link>
      </div>
    );
};

export default Legend;