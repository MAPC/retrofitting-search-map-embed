/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData'; 
import Chart from './Chart';
import Legend from './Legend';

interface ExpandedMuniRowProps {
  data: Array<CsvData>,
  node: Array<CsvData>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined
}

const containerStyle = css`
  display: flex;
  flex-flow: row wrap;
  h2 {
    margin: .5rem 0 1.5rem;
    width: 100%;
  }
  .legend {
    width: 100%;
  }
`;

const bold = css`
  font-weight: 600;
  padding-right: 2px;
  color: black;
`;

function getMuniTax(data: Array<CsvData>, selectedMuni: string|undefined): Array<number> {
  let taxDifferentials: Array<number> = [];
  let sum: number = 0;
  let average: number = 0;
  data.reduce((taxDifferentials: Array<number>, node: CsvData) => {
    if (node.municipal === selectedMuni) {
      taxDifferentials.push(parseFloat(node.Site_Tax_Revenue_Change));
    }
    return taxDifferentials;
  }, taxDifferentials);  
  if (taxDifferentials.length > 0) {
    sum = 0;
    average = 0;
    taxDifferentials.forEach(function(e) {
      sum = sum + e;
    });
    average = sum / taxDifferentials.length;
  }
  return [taxDifferentials.length, sum, average];
}

function getMuniSiteArea(data: Array<CsvData>, selectedMuni: string|undefined): number {
  let siteAreaArray: Array<number> = [];
  let siteAreaSum: number = 0;
  data.reduce((siteAreaArray: Array<number>, node: CsvData) => {
    if (node.municipal === selectedMuni) {
      siteAreaArray.push(+node.sitearea_ac);
    }
    return siteAreaArray
  }, siteAreaArray);
  if (siteAreaArray.length > 0) {
    siteAreaSum = 0;
    siteAreaArray.forEach(function(e) {
      siteAreaSum = siteAreaSum + e;
    });
  }
  return siteAreaSum;
}

function getMuniTransit(data: Array<CsvData>, selectedMuni: string|undefined): number {
  let stationArray: Array<number> = [];
  let stationSum: number = 0;
  data.filter((e) => {
    if (e.municipal === selectedMuni && e.statname !== "") {
      stationArray.push(+e.sitearea_ac)
      stationSum++;
    }
    return stationSum;
  }, stationSum);
  if (stationArray.length > 0) {
    let stationAreaSum = 0;
    stationArray.forEach(function(e) {
      stationAreaSum = stationAreaSum + e;
    });
  }
  return stationSum;
}

function getPotentialUnits(data: Array<CsvData>, selectedMuni: string|undefined): number {
  let unitsArray: Array<number> = [];
  let unitsSum: number = 0;
  data.filter((e) => {
    if (e.municipal === selectedMuni && e.top10muni === "1") {
      unitsArray.push(+e.Estimated_Capacity__some_commercial_)
    }
    return unitsArray;
  })
  if (unitsArray.length > 0) {
    unitsArray.forEach((e) => {
      unitsSum = unitsSum + e;
    })
    return unitsSum;
  }
  return unitsSum;
}

function getTaxTopTen(data: Array<CsvData>, selectedMuni: string|undefined): number {
  let taxesArray: Array<number> = [];
  let taxesSum: number = 0;
  data.filter((e) => {
    if (e.municipal === selectedMuni && e.top10muni === "1") {
      taxesArray.push(+e.Tax_Revenue__after_retrofit_)
    }
    return taxesArray;
  })
  if (taxesArray.length > 0) {
    taxesArray.forEach((e) => {
      taxesSum = taxesSum + e;
    })
    return taxesSum;
  }
  return taxesSum;
}

// no decimal places
function parseToString(input: number): string {
  return input.toFixed(0);
}

// one decimal places
function parseSingle(input: number): string {
  return input.toFixed(1);
}

// commas
function parseCommas(string: any) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ExpandedMuniRow: React.FC<ExpandedMuniRowProps> = ({ data, node, selectedMuni, highlightedSites, sitesCount }) => {
  const quantitySites : number = getMuniTax(data, selectedMuni)[0];
  const averageDiff : number = getMuniTax(data, selectedMuni)[2];
  const transitSites : number = getMuniTransit(data, selectedMuni);

  return (
    <div css={containerStyle}>
      <h2>Summary Statistics</h2>
      <p className="value"><span css={bold}>{parseCommas(parseToString(quantitySites))}</span></p>
      <p className="field">Sites</p>
      <p className="value"><span css={bold}>{parseCommas(parseSingle(getMuniSiteArea(data, selectedMuni)))}</span></p>
      <p className="field">Acres Sites Area</p>
      <p className="value"><span css={bold}>{transitSites}</span></p>
      <p className="field">{transitSites === 1 ? "Site Near MBTA Transit" : "Sites Near MBTA Transit"}</p>
      <p className="value"><span css={bold}>${parseCommas(parseToString(averageDiff))}</span></p>
      <p className="field">Average New Tax Revenue Per Site</p>
      <p className="value"><span css={bold}>{parseCommas(parseToString(getPotentialUnits(data, selectedMuni)))}</span></p>
      <p className="field">Potential Units, top 10% of sites</p>
      <p className="value"><span css={bold}>${parseCommas(parseToString(getTaxTopTen(data, selectedMuni)))}</span></p>
      <p className="field">Potential New Tax Revenue, top 10% of sites</p>
    </div>
  )
};

export default ExpandedMuniRow;