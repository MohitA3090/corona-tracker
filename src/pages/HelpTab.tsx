import React from 'react';
import { IonButton, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { mailOutline, logoWebComponent, mailSharp, logoWhatsapp, callOutline, walletOutline } from 'ionicons/icons';

const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Covid-19 Dashboard Using Ionic React</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol class="pageTitle">Help & Feedback</IonCol>
        </IonRow>
        <IonCard>
          <IonList>
            <IonItem>
              <IonLabel>Call WHO helpline Number</IonLabel>
              <IonButton color='warning' href="tel:+41-22-7912111"><IonIcon slot="start" icon={callOutline} /> Call</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Email WHO Team</IonLabel>
              <IonButton color='warning' href="mailto:mediainquiries@who.int"><IonIcon slot="start" icon={mailOutline} /> Email</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Text 'Hi' to WHO helpdesk</IonLabel>
              <IonButton color='warning' href="https://api.whatsapp.com/send?phone=41798931892&text=hi&source=&data="><IonIcon slot="start" icon={logoWhatsapp} /> WhatsApp</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Donate via WHO website</IonLabel>
              <IonButton color='warning' href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate"><IonIcon slot="start" icon={walletOutline} /> Donate</IonButton>
            </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
