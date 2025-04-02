/*==============================================================*/
/* Nom de SGBD : PostgreSQL 8                                  */
/* Date de création :  28/03/2025 08:35:36                      */
/*==============================================================*/

drop table if exists A_LIKE cascade;
drop table if exists A_RETWEET cascade;
drop table if exists COMMENTAIRE cascade;
drop table if exists COMPTE cascade;
drop table if exists POST cascade;


/*==============================================================*/
/* Table : A_LIKE                                               */
/*==============================================================*/
create table A_LIKE (
   IDCOMPTE             INT4                 not null,
   IDPOST               INT4                 not null,
   constraint PK_A_LIKE primary key (IDCOMPTE, IDPOST)
);


/*==============================================================*/
/* Table : A_RETWEET                                            */
/*==============================================================*/
create table A_RETWEET (
   IDCOMPTE             INT4                 not null,
   IDPOST               INT4                 not null,
   DESCRIPTIONRT        VARCHAR(400)          null,
   DATERT               TIMESTAMP            default NOW(),  -- Valeur par défaut : date et heure actuelles
   constraint PK_A_RETWEET primary key (IDCOMPTE, IDPOST)
);


/*==============================================================*/
/* Table : COMMENTAIRE                                          */
/*==============================================================*/
create table COMMENTAIRE (
   IDCOMMENTAIRE        SERIAL               not null,
   IDCOMPTE             INT4                 not null,
   IDPOST               INT4                 not null,
   TEXTE                VARCHAR(300)         null,
   DATECOMMENTAIRE      TIMESTAMP            default NOW(),  -- Valeur par défaut : date et heure actuelles
   constraint PK_COMMENTAIRE primary key (IDCOMMENTAIRE)
);


/*==============================================================*/
/* Table : COMPTE                                               */
/*==============================================================*/
create table COMPTE (
   IDCOMPTE             SERIAL               not null,
   PSEUDO               VARCHAR(50)          not null UNIQUE,
   NOM                  VARCHAR(50)          null,
   PRENOM               VARCHAR(50)          null,
   MAIL                 VARCHAR(70)          null,
   DATENAISSANCE        DATE                 null,
   TELEPHONE            VARCHAR(10)          null,
   URLIMAGECOMPTE       TEXT                 null,
   MDP                  VARCHAR(40)          not null,
   constraint PK_COMPTE primary key (IDCOMPTE)
);


/*==============================================================*/
/* Table : POST                                                 */
/*==============================================================*/
create table POST (
   IDPOST              SERIAL               not null,
   IDCOMPTE            INT4                 not null,
   DESCRIPTION         VARCHAR(400)         null,
   URLIMAGE            TEXT                 null,
   COMPTEURLIKE        INT4                 null,
   COMPTEURRETWEET     INT4                 null,
   COMPTEURCOMM        INT4                 null,
   DATEPOST            TIMESTAMP            default NOW(),  -- Valeur par défaut : date et heure actuelles
   constraint PK_POST primary key (IDPOST)
);

/*==============================================================*/
/* Foreign Key Constraints with ON DELETE CASCADE                */
/*==============================================================*/

alter table A_LIKE
   add constraint FK_A_LIKE_A_LIKE_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete cascade on update restrict;

alter table A_LIKE
   add constraint FK_A_LIKE_A_LIKE2_POST foreign key (IDPOST)
      references POST (IDPOST)
      on delete cascade on update restrict;

alter table A_RETWEET
   add constraint FK_A_RETWEE_A_RETWEET_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete cascade on update restrict;

alter table A_RETWEET
   add constraint FK_A_RETWEE_A_RETWEET_POST foreign key (IDPOST)
      references POST (IDPOST)
      on delete cascade on update restrict;

alter table COMMENTAIRE
   add constraint FK_COMMENTA_ASSOCIATI_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete cascade on update restrict;

alter table COMMENTAIRE
   add constraint FK_COMMENTA_ASSOCIATI_POST foreign key (IDPOST)
      references POST (IDPOST)
      on delete cascade on update restrict;

alter table POST
   add constraint FK_POST_A_PUBLIER_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete cascade on update restrict;

ALTER TABLE POST
   ALTER COLUMN DATEPOST SET DEFAULT CURRENT_DATE;

ALTER TABLE COMMENTAIRE
   ALTER COLUMN DATECOMMENTAIRE SET DEFAULT CURRENT_DATE;

ALTER TABLE A_RETWEET
   ALTER COLUMN DATERT SET DEFAULT CURRENT_DATE;


-- Insertion des données
INSERT INTO COMPTE (PSEUDO, NOM, PRENOM, MAIL, DATENAISSANCE, TELEPHONE, URLIMAGECOMPTE, MDP) VALUES
('alan_smithee', 'Smithee', 'Alan', 'alan.smithee@example.com', '1975-08-15', '0612345678', 'https://static.wikia.nocookie.net/scoobydoo/images/e/e4/Bernie_Alan.png','Docker'),
('arthur_besse', 'Besse', 'Arthur', 'arthur.besse@example.com', '1982-11-22', '0623456789', 'https://image-uniservice.linternaute.com/image/450/3/2388945607/4968498.jpg','Docker'),
('franz_bibfeldt', 'Bibfeldt', 'Franz', 'franz.bibfeldt@example.com', '1990-03-10', '0634567890', 'https://divinity.uchicago.edu/sites/default/files/styles/sightings_article_featured_image/public/2022-04/screen_shot_2022-04-06_at_2.07.57_pm.v1.jpg?itok=Wy32DcH1','Docker'),
('jean_botul', 'Botul', 'Jean', 'jean.botul@example.com', '1985-06-30', '0645678901', 'https://www.causeur.fr/wp-content/uploads/2010/03/BHL.jpg','Docker'),
('blanche_dumas', 'Dumas', 'Blanche', 'blanche.dumas@example.com', '1992-07-25', '0656789012', 'https://pictures.abebooks.com/inventory/11256788587.jpg','Docker'),
('nicolas_renard', 'Renard', 'Nicolas', 'nicolas.renard@example.com', '1988-09-15', '0667890123', 'https://i1.rgstatic.net/ii/profile.image/573331118059520-1513704198030_Q512/Nicolas-Renard.jpg','Docker'),
('g_peck', 'Peck', 'Georges', 'georges.peck@example.com', '1980-01-05', '0678901234', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Gregory_Peck_1948.jpg/250px-Gregory_Peck_1948.jpg','Docker'),
('john_doe', 'Doe', 'John', 'john.doe@example.com', '1993-12-01', '0689012345', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkxxfsmRLNHvaTnM9rfNREqjXkU9zcjcUDXWTSm2b9KEHUDceiKwJmecnJ_vsyZ4i7MMY&usqp=CAU','Docker'),
('basile_dupond', 'Dupond', 'Basile', 'basile.dupond@example.com', '1991-04-20', '0690123456', 'https://media.licdn.com/dms/image/v2/D4E03AQFuHaAyZikY2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696261449971?e=2147483647&v=beta&t=_QbtRbDA1e965XgZpM98-BvwAOyUZs1zax8DLdg_gEY','Docker'),
('adam_blade', 'Blade', 'Adam', 'adam.blade@example.com', '1987-08-30', '0612345679', 'https://www.nautiljon.com/images/perso/00/53/adam_blade_7535.webp','Docker'),
('paracelse_2', 'Paracelse', 'Philippe', 'philippe.paracelse@example.com', '1493-11-11', '0623456780', 'https://blog.nationalmuseum.ch/app/uploads/philippus_theophrastus_paracelsus-hirschvogel.webp','Docker'),
('ivan_petrov', 'Petrov', 'Ivan', 'ivan.petrov@example.com', '1817-07-29', '0634567891', 'https://img.a.transfermarkt.technology/portrait/big/919927-1649957678.png?lm=1','Docker'),
('el_garcia', 'Garcia', 'Elena', 'elena.garcia@example.com', '1541-10-01', '0645678902', 'https://www.ardian.com/sites/default/files/2023-04/Elena-Garcia.jpg','Docker'),
('alan_walker', 'Walker', 'Alan', 'alan.walker@example.com', '1975-08-15', '0656789013', 'https://caribana.ch/user/pages/08.artists/17.alan-walker/Alan_Walker-caribana-festival-geneve-nyon.jpg','Docker'),
('arthur_levy', 'Levy', 'Arthur', 'arthur.levy@example.com', '1982-11-22', '0667890124', 'https://images.squarespace-cdn.com/content/v1/5fe9e82f1593ec13b3292118/1610157888317-C8A7AEZHUOUCI2TC978S/Pic.jpg','Docker'),
('franz_meier', 'Meier', 'Franz', 'franz.meier@example.com', '1990-03-10', '0678901235', 'https://www.tu-braunschweig.de/fileadmin/_processed_/2/9/csm_meier_a35e333cd1.jpg','Docker'),
('jean_durand', 'Durand', 'Jean', 'jean.durand@example.com', '1985-06-30', '0689012346', 'https://www.senat.fr/sen4Rimg/durand_jean0391r4_carre.jpg','Docker'),
('blanche_martin', 'Martin', 'Blanche', 'blanche.martin@example.com', '1992-07-25', '0690123457', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFT35NwLVnNVNyrope5hBErzJLxXCGL8aiaokT1zcrZP53_PenVoR0gbafDRjvcRGDDLo&usqp=CAU','Docker'),
('ptit_loup_blanc', 'Diard', 'Benoit', 'benoit.diard@example.com', '1992-07-25', '0620123457', 'https://yt3.googleusercontent.com/ytc/AIdro_mLLRhkeJ7k0pvJUoBEpAobSVf9LP-Yr1SLulbxyly7SQ=s160-c-k-c0x00ffffff-no-rj','Docker');

INSERT INTO POST (IDCOMPTE, DESCRIPTION, URLIMAGE, COMPTEURLIKE, COMPTEURRETWEET, COMPTEURCOMM, DATEPOST) VALUES
(1, 'Top 7 des rappeurs qui se sont deja fait djoufara. TOP 7 ...', 'https://www.lexpress.fr/resizer/gWttpIey3Dg75MChpRWQjtt1j-o=/883x0/cloudfront-eu-central-1.images.arcpublishing.com/lexpress/LFQZF36YDJA6ZDLQXH4JVRAKCY.jpg', 20, 3, 1, '2024-02-15 14:23:00'),
(2, 'Salut mes pupuces nouveaux showcases a l''AZAR STUDIO 52 dimanche soir 23h', 'https://th.bing.com/th/id/OIP.CAf0BGuAyhkXHkAt98-PJwHaIf?rs=1&pid=ImgDetMain', 10, 5, 1, '2024-04-10 19:45:00'),
(3, 'Vous pensez je mesure combien d''iphone', 'https://m1.quebecormedia.com/emp/emp/Capture_d_e_cran_le_2022_10_25_a_16.09.58661f1f0c-1963-4dc4-a971-4bb400402043_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=49&w=1164&h=653&width=1200', 13, 11, 1, '2024-06-30 08:10:00'),
(4, 'OMAR SY : L''INTERVIEW FACE CACHÉE Dispo sur YouTube  https://youtu.be/2yVrWk9WQ2s', 'https://www.agoravox.tv/local/cache-vignettes/L476xH268/omar-sy-interview-hugo-99372.jpg', 8, 35, 1, '2024-09-05 22:30:00'),
(5, 'Il annonce qu''il jouera son dernier match avec le psg dimanche, temps gagné 3 min 40', 'https://web.cameroonmagazine.com/wp-content/uploads/2024/05/VIDEO-Kylian-Mbappe-annonce-publiquement-son-depart-du-PSG.jpg', 18, 22, 1, '2024-12-20 17:55:00');


INSERT INTO COMMENTAIRE (IDCOMPTE, IDPOST, TEXTE) VALUES
(18,2,'Pourquoi vous donnez de la force a un detraqué comme lui'),
(8,3,'Je pense tu fait 3 fois mon paf en vrai'),
(1,5,'Merci tu gères'),
(4,1,'C''est bon on a compris. En plus favé il fait des bons sons surtout le dernier'),
(12,4,'Grave intéressant comme d''hab');


INSERT INTO A_LIKE (IDCOMPTE, IDPOST) VALUES 
(3, 2), (12, 4), (1, 5), (18, 3), (7, 1), 
(14, 2), (9, 4), (11, 5), (5, 3), (6, 1),
(13, 2), (17, 4), (8, 5), (2, 3), (4, 1),
(16, 2), (10, 4), (15, 5), (12, 1), (3, 4),
(9, 2), (18, 5), (1, 3), (7, 4), (14, 1),
(8, 2), (16, 3), (5, 5), (6, 4), (11, 1);


INSERT INTO A_RETWEET (IDCOMPTE, IDPOST, DESCRIPTIONRT, DATERT) VALUES 
(1, 5, 'Le football il a changé', '2024-03-12 10:15:00'),
(19, 3, 'Mac c''est vraiment mieux que Windows', '2024-07-25 18:40:00'),
(5, 2, 'Toujours présent aux showcases !', '2024-05-30 21:00:00'),
(8, 1, 'Top 7 des meilleurs moments', '2024-09-10 14:25:00'),
(12, 4, 'Omar Sy en interview, à voir absolument !', '2024-11-18 08:50:00');

