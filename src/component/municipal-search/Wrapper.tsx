/** @jsx jsx */

import React, { useState, useRef, useReducer } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { jsx, css } from '@emotion/react';
import { themeColors } from '../../utils/theme';
import MunicipalData from './MunicipalData';
import SearchMap from './SearchMap';

const wrapperStyle = css`
  background: ${themeColors.gossamer};
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
`;

type MunicipalSearch = {
  highlightedSites: Array<number|undefined>,
}

const initialState: MunicipalSearch = {
  highlightedSites: []
}

function reducer(state: MunicipalSearch, action: any) {
  switch(action.type) {
    case 'addSite':
      if (state.highlightedSites.find(site => site === action.toggledSite)) {
        return {...state, highlightedSites: state.highlightedSites.filter(item => item !== action.toggledSite)}
      }
      return {...state, highlightedSites: [...state.highlightedSites, action.toggledSite]};
    default:
      return {...state};
  }
}

const Wrapper: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedMuni, setMuni] = useState<string|undefined>();
  const [sitesCount, setSitesCount] = useState<number|undefined>(0);
  const [selectedSite, setSite] = useState<any>();
  const containerRef = useRef<HTMLInputElement>(null);
  return (
    <StaticQuery
      query={graphql`
        {
          allSitesMpClean20210902Csv {
            nodes {
              AREA_parce
              Buildable_Area__sf_
              Estimated_Capacity__all_residential_
              Estimated_Capacity__some_commercial_
              Growth_Potential_Score
              Healthy_Communities_Score
              Healthy_Watersheds_Score
              Impervious_surface__sf_
              Municipal_Avg_Tax_Increase
              Municipal_Total_Tax_Increase
              Number_of_Parcels_on_Site
              Open_Space
              Overall_Score
              Parcel_IDs
              Quintile_Category
              Site_Tax_Revenue_Change
              Submarket
              Tax_Revenue__after_retrofit_
              Tax_Revenue__before_retrofit_
              Top_Category
              Travel_Choices_Score
              area_acres
              bldg_value
              bldlnd_rat
              buildarea_ac
              buildarea_sf
              commtype
              county
              disttosewerft
              muni
              municipal
              municipal_rank
              parcel_addr
              parcel_addrl
              regional_rank
              site_oid
              sitearea_sf
              station
              subregion
              subtype
              total_valu
              walkscore
              wetland100_p
            }
          }
        }
      `}

      render={(data) => (
        <div css={wrapperStyle}>
          <MunicipalData
            data={data.allSitesMpClean20210902Csv.nodes}
            selectedMuni={selectedMuni}
            sitesCount={sitesCount}
            setSitesCount={setSitesCount}
            selectedSite={selectedSite}
            setSite={setSite}
            node={data.allSitesMpClean20210902Csv.nodes}
            containerRef={containerRef}
            highlightedSites={state.highlightedSites} //passing to SiteRow
            dispatch={dispatch}
          />
          <SearchMap
            data={data.allSitesMpClean20210902Csv.nodes}
            selectedMuni={selectedMuni}
            setMuni={setMuni}
            selectedSite={selectedSite}
            setSite={setSite}
            containerRef={containerRef}
            highlightedSites={state.highlightedSites}
            dispatch={dispatch}
          />
        </div>
      )}
    />
  );
};

export default Wrapper;
