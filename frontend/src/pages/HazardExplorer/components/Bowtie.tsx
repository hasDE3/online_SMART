/** 
 * 'Bowtie.tsx' defines the 'Graph' tab in Hazard Log.
 * Use the Mind Map component of GGEditor to archive the bowite-like graph.
 * Not real bowtie diagram.
 * The current bowtie diagram can only be viewed.
 * 
 */

import React, { FC, useEffect, useState, useRef } from 'react';
import { connect, Dispatch, Link, history } from 'umi';
import { HazardTypeState } from '../models/HazardTypeModel';
import { HazardInstanceState } from '../models/HazardInstanceModel';
import { FetchSystemFunctionState } from '../models/FetchSystemFunction2';
import { SingleHazardTypeState } from '../models/FetchSingleHazardType';
import { HazardInstanceItemType, HazardTypeItemType } from '../data.d';
import { CauseEffectState } from '@/models/CauseEffectModel';
import GGEditor, { Mind } from 'gg-editor';
import BowtieConfiguration from './BowtieConfiguration';
import styles from './bowtie.less';
import { CauseItemType, CauseControlItemType, EffectControlItemType, EffectItemType } from '@/services/causeeffect';

// Disable GGEditor's Tracking
GGEditor.setTrackable(false);

// Mind Map Component has a similar interface with Bowtie Diagram
// Graph Data is defined here
// Just initilize the object
// The '0000000' has no menaing
let mindData = {
  roots: [
    {
      label: '0000000000',
      children: [
      ],
    }
  ],
};

interface BowtieProps {
  dispatch: Dispatch<any>;
  HazardTypeSpace: HazardTypeState;
  HazardInstanceSpace: HazardInstanceState;
  SingleHazardTypeSpace: SingleHazardTypeState;
  FetchSystemFunctionSpace: FetchSystemFunctionState;
  CauseEffectSpace: CauseEffectState;
  loading: boolean;
  record: HazardInstanceItemType;
}

const Bowtie: React.FC<BowtieProps> = ({
  dispatch,
  HazardTypeSpace: { htData },
  HazardInstanceSpace: { hiData },
  SingleHazardTypeSpace: { shtData },
  FetchSystemFunctionSpace: { sfData },
  CauseEffectSpace: { caData, efData, cacoData, efcoData },
  record,
  loading,
}) => {  
  
  // Cause
  //let rootChildren: [] = [];
  // Cause Control
  let causeChildren: [] = [];  
  // Effect
  
  // Sometimes the page cannot fetch causes and effects correctlly, so changed
  //let rootChildren2: [] = [];
  // Effect Control
  //let effectChildren: [] = [];

  useEffect(() => {
    dispatch({
      type: 'HazardTypeSpace/fetchHazardType',
      payload: {
      },
    });
    mindData['roots'][0]['label'] = record.hi_name!;

  }, []);

  // Left side of the graph
  // Cause & Cause Control
  useEffect(() => {
    // Fetch Cause
    dispatch({
      type: 'CauseEffectSpace/fetchCause',
      payload: {
        ca_hi: record.pk,
      },
    }).then((data: CauseItemType[]) => {      
      for (let i:number = 0; i < data.length; i++) {
        let causePush: {} = {
          label: data[i].ca_name + ' (CAUSE)',
          side: 'left',
          id: data[i].id,
          children: [],          
        }        
        mindData['roots'][0]['children'].push(causePush);
      }

      // Fetch Cause Control
      dispatch({
        type: 'CauseEffectSpace/fetchCauseControl',
        payload: {
          
        },
      }).then((data: CauseControlItemType[]) => {   
        for (let k:number = 0; k < mindData['roots'][0]['children'].length; k++) {
          // Clear 'causeChildren' before adding elements
          causeChildren = [];
          // If the cause control is associated to the cause, add it to the 'mindData'
          for (let j: number = 0; j < data.length; j++) {
            if (mindData['roots'][0]['children'][k]['id'] == data[j].caco_ca) {
              console.log('Found!');
              let controlPush: {} = {
                label: data[j].caco_name,
                side: 'left',
                id: data[j].id,
              }
              let addable:boolean = true;
              for (let p:number = 0; p < causeChildren.length; p++) {
                if (causeChildren[p]['id'] == controlPush['id']) {
                  addable = false;
                }
              }
              if (addable) {
                causeChildren.push(controlPush);
              }          
            }
          }
          mindData['roots'][0]['children'][k]['children'] = causeChildren;
        }
        
        console.log(mindData);
      })      
    })
  }, []);

  // Right side of the graph
  // Effect & Effect Control
  useEffect(() => {
    // Fetch Effect
    dispatch({
      type: 'CauseEffectSpace/fetchEffect',
      payload: {
        ef_hi: record.pk,
      },
    }).then((data: EffectItemType[]) => {      
      for (let i:number = 0; i < data.length; i++) {
        let effectPush: {} = {
          label: data[i].ef_name + ' (EFFECT)',
          side: 'right',
          id: data[i].id,
          children: [],          
        }        
        // Push the Effect element directly to the graph data
        mindData['roots'][0]['children'].push(effectPush);
      }
      
      // Fetch Effect Control
      dispatch({
        type: 'CauseEffectSpace/fetchEffectControl',
        payload: {          
        },
      }).then((data: EffectControlItemType[]) => {   
        for (let k:number = 0; k < mindData['roots'][0]['children'].length; k++) {                    
          // If the effect control is associated to the cause, add it to the 'mindData'
          for (let j: number = 0; j < data.length; j++) {                        
            if (mindData['roots'][0]['children'][k]['id'] == data[j].efco_ef) {              
              let effectPush: {} = {
                label: data[j].efco_name,
                side: 'right',
                id: data[j].id,
              }
              mindData['roots'][0]['children'][k]['children'].push(effectPush);
            }
          }
        }        
        //console.log(mindData);
      })      
    })
  }, []);

  /**
  useEffect(() => {
    dispatch({
      type: 'FetchSystemFunctionSpace/fetchSystemFunction',
      payload: {
      },
    });
  }, []);
  */

  return (
    <div>
    <GGEditor        
    >
      <BowtieConfiguration
        mindData={mindData}
      />

      <Mind        
        className={styles.graph}
        data={mindData}
        graph={{ mode: 'readOnly' }}
      />
    </GGEditor>
    </div>

  );
};

// Some Spaces/States are not necessary
// Can be optimized
export default connect(
  ({
    SingleHazardTypeSpace,
    FetchSystemFunctionSpace,
    HazardInstanceSpace,
    HazardTypeSpace,
    CauseEffectSpace,
    loading,
  }: {
    SingleHazardTypeSpace: SingleHazardTypeState;
    FetchSystemFunctionSpace: FetchSystemFunctionState;
    HazardInstanceSpace: HazardInstanceState;
    HazardTypeSpace: HazardTypeState;
    CauseEffectSpace: CauseEffectState;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    SingleHazardTypeSpace,
    FetchSystemFunctionSpace,
    HazardInstanceSpace,
    HazardTypeSpace,
    CauseEffectSpace,
    loading: loading.models.HazardTypeSpace,
  }),
)(Bowtie);