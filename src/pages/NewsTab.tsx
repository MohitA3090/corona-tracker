import React, {useState, useEffect} from 'react';
import { IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonList, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import moment from 'moment';
import axios from 'axios'
import './Tab1.css';

// interface INewsResult {
//   status: string,
//   totalResults: number;
//   articles: IArticle[];
// }

interface IArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const NewsTab: React.FC = () => {

  const [data, setData] = useState<IArticle[]>([]);
  const[showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getData = async() => {
      const result = await axios('https://newsapi.org/v2/top-headlines?q=covid&apiKey=397d3d9df5ed46ea8ed7836530002789&country=in');
      console.log(result.data.articles);
      setData(result.data.articles);
      setShowLoading(false); 
    };
    getData();
  },[]);

  function showImageIfExists(imageUrl: string): any{
    if(imageUrl != ''){
      return <IonImg src={imageUrl} class="newsImage" />
    }
    else
      return <IonImg src="assets/images/NoImage.png" class="newsImage" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Covid-19 Dashboard Using Ionic React</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching latest news articles..'} />
        <IonRow>
          <IonCol class="pageTitle">Related News Bulletins</IonCol>
        </IonRow>
        <IonList>
          {data.map((news, idx) => (
             <IonItem key={idx}>
               <IonCard>
                 <IonGrid>
                   <IonRow class="newsTitle">{news?.title}</IonRow>
                     <IonRow class="newsSource">
                       <IonCol>{news?.author}</IonCol>
                       <IonCol>{moment(news?.publishedAt).format('DD MMM YYYY')}</IonCol>
                     </IonRow>
                     <IonRow>{showImageIfExists(news?.urlToImage)}</IonRow>
                     <IonRow class="newsContent">{news?.description}</IonRow>
                 </IonGrid>
               </IonCard>
             </IonItem> 
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NewsTab;
