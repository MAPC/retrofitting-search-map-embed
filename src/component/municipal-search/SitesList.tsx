/** @jsx jsx */

import React, { useState, useEffect, useRef } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { AlignTop, PushPinSimple } from 'phosphor-react';
import SiteRow from './SiteRow';

interface SitesListProps {
  data: Array<CsvData>,
  dispatch: React.Dispatch<unknown>,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined,
  selectedMuni: string|undefined,
  selectedSite: any,
  setSite: React.SetStateAction<any>,
  setSitesCount: React.SetStateAction<any>
}

const ulStyle = css`
  list-style: none;
  margin: .5rem 0;
  max-width: 45rem;
  overflow-y: scroll;
  padding-left: 0;
  width: 45rem;
  z-index: 1;
`;

function filterData(
    data: Array<CsvData>, 
    dispatch: React.Dispatch<unknown>, 
    highlightedSites: Array<number|undefined>, 
    selectedMuni: string|undefined, 
    selectedSite: any, 
    setSite: React.SetStateAction<any>, 
    setSitesCount: React.SetStateAction<any>, 
    sitesCount: number|undefined 
  ): Array<JSX.Element>|undefined 
{
  if (selectedMuni) {
    data.sort((a: any, b: any) => 
      // choose sort-by attribute here
      b.Quintile_Category - a.Quintile_Category
    );
    let count = data.filter(d => d.municipal == selectedMuni).length;
    setSitesCount(count);
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<SiteRow 
          data={data} 
          dispatch={dispatch} 
          highlightedSites={highlightedSites} 
          key={node.site_oid} 
          node={node} 
          selectedMuni={selectedMuni} 
          selectedSite={selectedSite} 
          setSite={setSite} 
          sitesCount={sitesCount} 
        />);
      }
      // const siteIntoView:any = document.getElementById(list[0]site_oid);
      // // console.log("executeScroll executing");
      // siteIntoView.scrollIntoView({behavior: "smooth", AlignTop});
      // console.log("list 0.key:", list[0]);
      return list;
    }, []);
  }
  return undefined;
}

// original
// function executeScroll(
//     data: Array<CsvData>, 
//     dispatch: React.Dispatch<unknown>, 
//     highlightedSites: Array<number|undefined>, 
//     selectedMuni: string|undefined, 
//     selectedSite: any, 
//     setSite: React.SetStateAction<any>, 
//     setSitesCount: React.SetStateAction<any>, 
//     sitesCount: number|undefined 
//   ): any|undefined 
// {
//   console.log("selectedSite", selectedSite.site_oid);
//   if (selectedMuni && selectedSite && selectedSite.municipal === selectedMuni) {
//       const siteIntoView:any = document.getElementById(selectedSite.site_oid);
//       console.log("executeScroll executing");
//       siteIntoView.scrollIntoView({behavior: "smooth"});
//   } else {
//       return null;
//   }
// }

function executeScroll(
    selectedMuni: string|undefined, 
    selectedSite: any
  ): any|undefined 
{
  if (selectedMuni && selectedSite.municipal === selectedMuni) {
      const siteIntoView:any = document.getElementById(selectedSite.site_oid);
      siteIntoView.scrollIntoView({behavior: "smooth", AlignTop});
  } else {
      return null;
  }
}

function scrollToTop(selectedMuni: string|undefined) {
  if (selectedMuni) {
  const sitesList:any = document.getElementById("sites-list");
  sitesList.scrollTop = 0;
  } else {
    return undefined;
  }
}

const SitesList: React.FC<SitesListProps> = ({ 
  data, 
  dispatch, 
  highlightedSites, 
  selectedMuni, 
  selectedSite,
  setSite, 
  setSitesCount,
  sitesCount
}) => {

  // const executeScroll = () => {
  //   console.log("selectedSite", selectedSite.site_oid);
  //   if (selectedMuni && selectedSite && selectedSite.municipal === selectedMuni) {
  //       const siteIntoView = document.getElementById(selectedSite.site_oid);
  //       console.log("executeScroll executing");
  //       siteIntoView.scrollIntoView({behavior: "smooth"});
  //   } else {
  //       return null;
  //   }
  // }

  useEffect(() => {
    executeScroll(
      selectedMuni, 
      selectedSite
    );
  }, [selectedSite])

  useEffect(() => {
    scrollToTop(selectedMuni);
  }, [selectedMuni])

  return (
    <ul css={ulStyle} id="sites-list">
      {selectedMuni ? filterData(
        data, 
        dispatch, 
        highlightedSites, 
        selectedMuni, 
        selectedSite, 
        setSite,
        setSitesCount, 
        sitesCount
        ) : ''
      }
    </ul>
  )
};

export default SitesList;