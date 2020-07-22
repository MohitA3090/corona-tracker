import React, { useEffect, useState } from 'react';
import { IonCard, IonContent, IonGrid, IonHeader, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar, IonRow, IonCol } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import axios from 'axios'
import { Pie } from 'react-chartjs-2'
import codesToCountryNames from '../CountryCodesNames.json';

interface IGlobalCount {
  count: number;
  date: string;
  result: ICaseCount;
}

interface ICaseCount {
  confirmed: number;
  recovered: number;
  deaths: number;
}

interface ICountry {
  country: ICaseCount
}

interface IGlobalCountryWiseCount {
  count: number;
  date: string;
  result: ICountry[];
}

interface ICountryCodeNamesJson {
  countryCodes : ICountryCodeNames;
}

interface ICountryCodeNames {
  code: string;
  name: string;
}

export function CalculateActiveCases(args: any){
  return <React.Fragment>{(args.a - (args.b + args.c)).toLocaleString()}</React.Fragment>
}

export function CountryCodesToNames(args: any): any {
  let country: ICountryCodeNames = codesToCountryNames[codesToCountryNames.map(item => { return item.code; }).indexOf(args.code)];
  return country ? country.name : args.code;
}


const slideOpts = {
  intialSlide: 1,
  speed: 50,
  slideShadows: true,
  loop: true,
  autoplay: true
}; 

const WorldTab: React.FC = () => {
  
  const [data, setData] = useState<IGlobalCount>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
      const getGlobalData = async () => {
        //latest global count
        const result = await axios('https://covidapi.info/api/v1/global');
        setData(result.data);
        setShowLoading(false);
      };
      getGlobalData();
    }, []);

  const confirmed = data?.result?.confirmed;
  const recovered = data?.result?.recovered;
  const deaths = data?.result?.deaths; 


  const globalCasesPieChart = {
    labels: ['Confirmed', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'Covid-19',
        backgroundColor: [
          '#4399F6',
          '#37EA61',
          '#F34943'
        ],
        hoverBackgroundColor: [
          '#007bff',
          '#127729',
          '#ff073a'
        ],
        data: [confirmed, recovered, deaths]
      }
    ]
  }

  const [countryWiseData, setCountryWiseData] = useState<ICountry[]>([]);
  useEffect(() => {
    const getGlobalCountryData = async () => {
      const result = await axios('https://covidapi.info/api/v1/global/latest');
      let sortedResult = result.data.result;
      sortedResult.sort((a: Object, b: Object) => {
        return (Object.values(a)[0].confirmed > Object.values(b)[0].confirmed ? -1 : (Object.values(a)[0].confirmed < Object.values(b)[0].confirmed ? 1 : 0));
      });
      setCountryWiseData(sortedResult);
    };
    getGlobalCountryData();
  }, []);  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Covid-19 Dashboard Using Ionic React</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow class="casesBox">
          <IonCol class="totalCases">Confirmed {confirmed?.toLocaleString()}</IonCol>
          <IonCol class="confirmedBox">Active <CalculateActiveCases a={confirmed} b = {recovered} c={deaths} /></IonCol>
          <IonCol class="recoveredBox">Recovered {recovered?.toLocaleString()}</IonCol>
          <IonCol class="deathsBox">Deaths {deaths?.toLocaleString()}</IonCol>
        </IonRow>
        <IonCard class="pieCard">
          <Pie data={globalCasesPieChart}
             options={{
               legend: {
                 display: true,
                 position: 'bottom',
               },
               plugins: {
                 datalabels: {
                   anchor: 'end',
                   clamp: 'true',
                   align: 'bottom',
                   color: 'black',
                   labels: {
                     title: {
                       font: {
                         weight: 'bold'
                       }
                     }
                   }
                 }
               }
            }} />
        </IonCard>
        <IonSlides class="tipsSlides" options={slideOpts}>
          <IonSlide class="slide">
            Maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing.
          </IonSlide>
          <IonSlide class="slide">
            Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.
          </IonSlide>
          <IonSlide class="slide">
            If you have fever, cough and difficulty breathing, seek medical care early.
          </IonSlide>
          <IonSlide class="slide">
            Avoid touching eyes, nose and mouth. #StayHomeStaySafe
          </IonSlide>
          <IonSlide class="slide">
            WHO Health Alert brings COVID-19 facts to billions via WhatsApp.
          </IonSlide>
        </IonSlides>
        <IonCard>
          <IonGrid>
            <IonRow class="tableTitle">
              <IonCol col-4 class="tableCountry">Country</IonCol>
              <IonCol class="tableCol">Confirmed</IonCol>
              <IonCol class="tableCol">Active</IonCol>
              <IonCol class="tableCol">Recovered</IonCol>
              <IonCol class="tableCol">Deaths</IonCol>
            </IonRow>
            {countryWiseData.map((item,idx) => (
              <IonRow class="tableZebraStrip" key={idx}>
                <IonCol col-4 class="tableCountry"><CountryCodesToNames code={Object.keys(item)[0]} /></IonCol>
                <IonCol class="tableCol">{Object.values(item)[0].confirmed?.toLocaleString()}</IonCol>
                <IonCol class="tableCol"><CalculateActiveCases  a={Object.values(item)[0].confirmed} b={Object.values(item)[0].recovered} c={Object.values(item)[0].deaths} /></IonCol>
                <IonCol class="tableCol">{Object.values(item)[0].recovered?.toLocaleString()}</IonCol>
                <IonCol class="tableCol">{Object.values(item)[0].deaths?.toLocaleString()}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
      <IonRow class="tableFooter">
        <IonCol col-4 class="tableCountry">World</IonCol>
        <IonCol class="tableCol">{confirmed?.toLocaleString()} </IonCol>
        <IonCol class="tableCol"><CalculateActiveCases a={confirmed} b={recovered} c={deaths} /></IonCol>
        <IonCol class="tableCol">{recovered?.toLocaleString()}</IonCol>
        <IonCol class="tableCol">{deaths?.toLocaleString()}</IonCol>
      </IonRow>
    </IonPage>
  );
};

export default WorldTab;
