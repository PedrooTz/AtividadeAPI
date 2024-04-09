create database db_acme_filmes_turma_ab;
use db_acme_filmes_turma_ab;

create table login(
id int not null auto_increment primary key,
email varchar(100),
senha varchar(100)
);

/* INSERT INTO  */

create table cadastro(
id int not null auto_increment primary key,
nome varchar(100),
email varchar(100),
senha varchar(100)
);

/* INSERT INTO */

create table tbl_filme (
id int not null auto_increment primary key,
nome varchar(80) not null,
genero varchar(80) not null,
sinopse text not null, 
atores text not null,
classificacao bigint,
duracao time not null,
diretores text not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(200) not null,
valor_unitario float,
unique index (id),
unique key (id)
);


insert into tbl_filme( 
					nome,
                    genero,
					sinopse,
                    atores,
                    classificacao,
					duracao, 
                    diretores,
					data_lancamento,
					data_relancamento, 
					foto_capa,
					valor_unitario
                    )values (
                    'Velozes e Furiosos 6',
                    'Acao',
                    'Em Velozes e Furiosos 6, os heróis se espalham pelo mundo após o golpe de Dom (Vin Diesel) e Brian (Paul Walker) no Rio de Janeiro que deixou o grupo com US$100 milhões',
                    'Paul Walker: Brian Oconner, Tyrese Gibson: Roman Pearce, Ludacris: Tej',
                    '12',
					'02:10:00',
                    'Justin Lin',
                    '2013-04-24',
                    null,
                    'https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/92/81/46/20528636.jpg',
                    '23.00'
                    ),
                    (
                    'Eu sou a Lenda',
                    'Ação e Terror',
                    'Um terrível vírus incurável, criado pelo homem, dizimou a população de Nova York. Robert Neville (Will Smith) é um cientista brilhante que, sem saber como, tornou-se imune ao vírus.',
                    'Will Smith: Tenente Coronel',
                    '16',
                    '01:40:00',
                    'Francis Lawrence',
                    '2008-01-18',
                    null,
                    'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/91/08/87/20128900.jpg',
                    '50.00'
                    );
                    
create table tbl_atores(
id int not null auto_increment primary key,
nome varchar(80) not null,
idade bigint not null,
participacao_filmes varchar(150)
);

insert into tbl_atores(
						nome,
						 idade, 
						 participacao_filmes
						 ) values(
                        'Roman Pearce',
                        '45',
                        'Velozes e Furiosos'
                        ),
                        (
                        'Will Smith',
						'55',
						'Eu sou a Lenda'
						);
                        
create table tbl_classificacao(
id int not null auto_increment primary key,
classificacao bigint not null,
filmes_classificacao varchar(100) not null
);

insert into tbl_classificacao(
							classificacao,
                            filmes_classificacao
                            )values(
                            '14',
                            'Velozes e Furiosos 6'
                            ),
                            (
                            '16',
                            'Eu sou a Lenda'
                            );
                            
create table tbl_diretores (
id int not null auto_increment primary key,
nome varchar(80) not null,
filmes_diretor varchar(90)
);

insert into tbl_diretores (
                            nome,
                            filmes_diretor
                            )values (
                            'Justin Lin',
                            'Velozes e Furiosos 6'
                            ),
                            (
                            'Francis Lawrence',
                            'Eu sou a Lenda'
                            );
                            
create table tbl_genero(
id int not null auto_increment primary key,
nome varchar(100),
filmes_genero varchar(100)
);

insert into tbl_genero(
						nome,
                        filmes_genero
                        )values (
                        'Ação',
                        'Velozes e Furiosos 6 e Eu sou a Lenda'
                        );
						
                        
select * from tbl_filme where nome like 'Eu sou%'; 

show tables;
                    
select * from tbl_filme;

drop table tbl_filme;

select last_insert_id() from tbl_filme limit 1;

 DELETE FROM tbl_filme WHERE id = 28;

select CAST(last_insert_id() as DECIMAL) as id from tbl_filme limit 1;
drop table tbl_filme;

desc tbl_filme;                    

show tables;