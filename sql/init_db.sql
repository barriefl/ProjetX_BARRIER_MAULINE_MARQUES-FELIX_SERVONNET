/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 8                                  */
/* Date de création :  28/03/2025 08:35:36                      */
/*==============================================================*/

drop table A_LIKE;
drop table A_RETWEET;
drop table COMMENTAIRE;
drop table COMPTE;
drop table POST;



/*==============================================================*/
/* Table : A_LIKE                                               */
/*==============================================================*/
create table A_LIKE (
   IDCOMPTE             INT4                 not null,
   IDPOSTE              INT4                 not null,
   constraint PK_A_LIKE primary key (IDCOMPTE, IDPOSTE)
);



/*==============================================================*/
/* Table : A_RETWEET                                            */
/*==============================================================*/
create table A_RETWEET (
   IDCOMPTE             INT4                 not null,
   IDPOSTE              INT4                 not null,
   constraint PK_A_RETWEET primary key (IDCOMPTE, IDPOSTE)
);



/*==============================================================*/
/* Table : COMMENTAIRE                                          */
/*==============================================================*/
create table COMMENTAIRE (
   IDCOMMENTAIRE        SERIAL               not null,
   IDCOMPTE             INT4                 not null,
   IDPOSTE              INT4                 not null,
   TEXTE                VARCHAR(300)         null,
   DATECOMMENTAIRE      DATE                 null,
   constraint PK_COMMENTAIRE primary key (IDCOMMENTAIRE)
);



/*==============================================================*/
/* Table : COMPTE                                               */
/*==============================================================*/
create table COMPTE (
   IDCOMPTE             SERIAL               not null,
   PSEUDO               VARCHAR(15)          null,
   NOM                  VARCHAR(20)          null,
   PRENOM               VARCHAR(20)          null,
   MAIL                 VARCHAR(40)          null,
   DATENAISSANCE        DATE                 null,
   TELEPHONE            VARCHAR(10)          null,
   URLIMAGE             TEXT                 null,
   MDP			VARCHAR(40)	     not null,
   constraint PK_COMPTE primary key (IDCOMPTE)
);



/*==============================================================*/
/* Table : POST                                                 */
/*==============================================================*/
create table POST (
   IDPOSTE              SERIAL               not null,
   IDCOMPTE             INT4                 not null,
   DESCRIPTION          VARCHAR(400)         null,
   URLIMAGE             TEXT                 null,
   COMPTEURLIKE         INT4                 null,
   DATE			DATE		     null,
   constraint PK_POST primary key (IDPOSTE)
);



alter table A_LIKE
   add constraint FK_A_LIKE_A_LIKE_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete restrict on update restrict;

alter table A_LIKE
   add constraint FK_A_LIKE_A_LIKE2_POST foreign key (IDPOSTE)
      references POST (IDPOSTE)
      on delete restrict on update restrict;

alter table A_RETWEET
   add constraint FK_A_RETWEE_A_RETWEET_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete restrict on update restrict;

alter table A_RETWEET
   add constraint FK_A_RETWEE_A_RETWEET_POST foreign key (IDPOSTE)
      references POST (IDPOSTE)
      on delete restrict on update restrict;

alter table COMMENTAIRE
   add constraint FK_COMMENTA_ASSOCIATI_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete restrict on update restrict;

alter table COMMENTAIRE
   add constraint FK_COMMENTA_ASSOCIATI_POST foreign key (IDPOSTE)
      references POST (IDPOSTE)
      on delete restrict on update restrict;

alter table POST
   add constraint FK_POST_A_PUBLIER_COMPTE foreign key (IDCOMPTE)
      references COMPTE (IDCOMPTE)
      on delete restrict on update restrict;

ALTER TABLE POST
	MODIFY COLUMN date DATE DEFAULT CURRENT_DATE;



INSERT INTO COMPTE (PSEUDO, NOM, PRENOM, MAIL, DATENAISSANCE, TELEPHONE, URLIMAGE, MDP) VALUES
('alan_smithee', 'Smithee', 'Alan', 'alan.smithee@example.com', '1975-08-15', '0612345678', 'http://example.com/image1.jpg','Docker'),
('arthur_besse', 'Besse', 'Arthur', 'arthur.besse@example.com', '1982-11-22', '0623456789', 'http://example.com/image2.jpg','Docker'),
('franz_bibfeldt', 'Bibfeldt', 'Franz', 'franz.bibfeldt@example.com', '1990-03-10', '0634567890', 'http://example.com/image3.jpg','Docker'),
('jean_baptiste_botul', 'Botul', 'Jean-Baptiste', 'jean-baptiste.botul@example.com', '1985-06-30', '0645678901', 'http://example.com/image4.jpg','Docker'),
('blanche_descartes', 'Descartes', 'Blanche', 'blanche.descartes@example.com', '1992-07-25', '0656789012', 'http://example.com/image5.jpg','Docker'),
('nicolas_bourbaki', 'Bourbaki', 'Nicolas', 'nicolas.bourbaki@example.com', '1988-09-15', '0667890123', 'http://example.com/image6.jpg','Docker'),
('g_w_peck', 'Peck', 'G.W.', 'gw.peck@example.com', '1980-01-05', '0678901234', 'http://example.com/image7.jpg','Docker'),
('john_rainwater', 'Rainwater', 'John', 'john.rainwater@example.com', '1993-12-01', '0689012345', 'http://example.com/image8.jpg','Docker'),
('basile_valentin', 'Valentin', 'Basile', 'basile.valentin@example.com', '1991-04-20', '0690123456', 'http://example.com/image9.jpg','Docker'),
('adam_blade', 'Blade', 'Adam', 'adam.blade@example.com', '1987-08-30', '0612345679', 'http://example.com/image10.jpg','Docker'),
('paracelse', 'Paracelse', 'Philippus Theophrastus Aureolus Bombast von Hohenheim', 'paracelse@example.com', '1493-11-11', '0623456780', 'http://example.com/image11.jpg','Docker'),
('ivan_aivazovski', 'Aivazovski', 'Ivan', 'ivan.aivazovski@example.com', '1817-07-29', '0634567891', 'http://example.com/image12.jpg','Docker'),
('le_greco', 'Greco', 'El', 'el.greco@example.com', '1541-10-01', '0645678902', 'http://example.com/image13.jpg','Docker'),
('alan_smithee', 'Smithee', 'Alan', 'alan.smithee2@example.com', '1975-08-15', '0656789013', 'http://example.com/image14.jpg','Docker'),
('arthur_besse', 'Besse', 'Arthur', 'arthur.besse2@example.com', '1982-11-22', '0667890124', 'http://example.com/image15.jpg','Docker'),
('franz_bibfeldt', 'Bibfeldt', 'Franz', 'franz.bibfeldt2@example.com', '1990-03-10', '0678901235', 'http://example.com/image16.jpg','Docker'),
('jean_baptiste_botul', 'Botul', 'Jean-Baptiste', 'jean-baptiste.botul2@example.com', '1985-06-30', '0689012346', 'http://example.com/image17.jpg','Docker'),
('blanche_descartes', 'Descartes', 'Blanche', 'blanche.descartes2@example.com', '1992-07-25', '0690123457', 'http://example.com/image18.jpg','Docker');
('ptit_loup_blanc', 'Diard', 'Benoit', 'benoit.diart@gmail.com', '1992-07-25', '0620123457', 'https://yt3.googleusercontent.com/ytc/AIf8zZTxYl71_NKMyOWfsEa7HW67NkgmVR_39MeJRo3a=s900-c-k-c0x00ffffff-no-rj','Docker');



INSERT INTO POST (IDCOMPTE, DESCRIPTION, URLIMAGE, COMPTEURLIKE) VALUES
('1','Top 7 des rappeurs qui se sont deja fait djoufara. TOP 7 ...','https://www.lexpress.fr/resizer/gWttpIey3Dg75MChpRWQjtt1j-o=/883x0/cloudfront-eu-central-1.images.arcpublishing.com/lexpress/LFQZF36YDJA6ZDLQXH4JVRAKCY.jpg',20),
('2','Salut mes pupuces nouveaux showcases a l''AZAR STUDIO 52 dimanche soir 23h','https://th.bing.com/th/id/OIP.CAf0BGuAyhkXHkAt98-PJwHaIf?rs=1&pid=ImgDetMain',10),
('3','Vous pensez je mesure combien d''iphone','https://m1.quebecormedia.com/emp/emp/Capture_d_e_cran_le_2022_10_25_a_16.09.58661f1f0c-1963-4dc4-a971-4bb400402043_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=49&w=1164&h=653&width=1200',13),
('4','OMAR SY : L''INTERVIEW FACE CACHÉE Dispo sur YouTube  https://youtu.be/2yVrWk9WQ2s','https://www.agoravox.tv/local/cache-vignettes/L476xH268/omar-sy-interview-hugo-99372.jpg',8),
('5','Il annonce qu''il jouera son dernier match avec le psg dimanche, temps gagné 3 min 40','https://web.cameroonmagazine.com/wp-content/uploads/2024/05/VIDEO-Kylian-Mbappe-annonce-publiquement-son-depart-du-PSG.jpg',18);



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



INSERT INTO A_RETWEET (IDCOMPTE, IDPOST) VALUES 
(3, 2), (12, 4), (1, 5), (18, 3), (7, 1),
(14, 2), (9, 4), (11, 5), (5, 3), (6, 1);