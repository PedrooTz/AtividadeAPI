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
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(200) not null,
valor_unitario float,
tbl_classificacao_id int not null,
tbl_genero_id int not null,
tbl_ator_filme_id int not null,
unique index (id),
unique key (id),

FOREIGN KEY (tbl_classificacao_id) 
REFERENCES tbl_classificacao (id),

FOREIGN KEY (tbl_genero_id) 
REFERENCES tbl_genero (id),

FOREIGN KEY (tbl_ator_filme_id) 
REFERENCES tbl_atores (id)
);

drop table tbl_filme;


insert into tbl_filme(
					nome,
					sinopse,
					duracao,
					data_lancamento,
					data_relancamento,
					foto_capa,
					valor_unitario,
                    tbl_classificacao_id,
                    tbl_genero_id,
                    tbl_ator_filme_id
					)values (
					'Velozes e Furiosos 6',
					'Em Velozes e Furiosos 6, os heróis se espalham pelo mundo após o golpe de Dom (Vin Diesel) e Brian (Paul Walker) no Rio de Janeiro que deixou o grupo com US$100 milhões',
					'02:10:00',
					'2013-04-24',
					null,
					'https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/92/81/46/20528636.jpg',
					'23.00',
                    1,
                    1,
                    1
					),
					(
					'Eu sou a Lenda',
					'Um terrível vírus incurável, criado pelo homem, dizimou a população de Nova York. Robert Neville (Will Smith) é um cientista brilhante que, sem saber como, tornou-se imune ao vírus.',
					'01:40:00',
					'2008-01-18',
					null,
					'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/91/08/87/20128900.jpg',
					'50.00',
                    5,
                    7,
                    2
					);
									   
create table tbl_atores(
id int not null auto_increment primary key,
nome varchar(80) not null,
data_nascimento date not null,
foto varchar(255) not null,
data_falecimento date,
biografia text(200),
sexo_id int,
nacionalidade_id int,
filme_ator_id int,
foreign key (sexo_id) references tbl_sexo(id),
foreign key (nacionalidade_id) references tbl_nacionalidade(id),
foreign key (filme_ator_id) references tbl_filme(id)
);

drop table tbl_atores;

insert into tbl_atores (
				nome,
				data_nascimento,
				foto,
				data_falecimento,
				biografia,
                sexo_id,
                nacionalidade_id,
                filme_ator_id
				) values(
				'Tyrese Darnell Gibson',
				'1978-12-30',
				'https://ovicio.com.br/wp-content/uploads/Roman_Pearce_-_Furious_7.jpg',
				null,
				'Tyrese Darnell Gibson, também conhecido como apenas Tyrese, (Los Angeles, 30 de dezembro de 1978)[1] é um cantor de R&B, rapper e ator americano, é ex-modelo e VJ da MTV.
				Depois de lançar vários álbuns, ele inicia sua carreira cinematográfica, com papel principais em vários filmes de Hollywood, incluindo Ruas Sangrentas - O Acerto Final,
				a série Fast and the Furious começando por + Velozes + Furiosos, a trilogia Transformers,
				O Voo da Fênix, Quatro Irmãos, e Baby Boy.',
                1,
                4,
                1
				),
				('Willard Carroll Smith',
				'1968-09-25',
				'https://br.web.img2.acsta.net/pictures/17/02/08/16/50/452749.jpg',
				null,
				'Willard Carroll Smith II, mais conhecido como Will Smith é um ator, rapper e produtor americano. Vencedor de diversos prêmios, incluindo um Oscar e quatro prêmios Grammy,
				tornou-se um dos poucos artistas a ter sucesso em três diferentes áreas de entretenimento dos Estados Unidos: cinema, televisão e música. ',
                1,
                2,
                2
				),
				(
				'Pedro Pedraga',
				'1968-09-25',
				'https://br.web.img2.acsta.net/pictures/17/02/08/16/50/452749.jpg',
				null,
				'Willard Carroll Smith II, mais conhecido como Will Smith é um ator, rapper e produtor americano. Vencedor de diversos prêmios, incluindo um Oscar e quatro prêmios Grammy,
				tornou-se um dos poucos artistas a ter sucesso em três diferentes áreas de entretenimento dos Estados Unidos: cinema, televisão e música.',
                2,
                1,
                1
				);
                
                
CREATE TABLE  tbl_sexo (
  id INT NOT NULL AUTO_INCREMENT primary key,
  sigla VARCHAR(1) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  unique key(id),
  unique index(id)
  );
  drop table tbl_sexo;
  
  insert into tbl_sexo ( sigla, nome) values (
											"M",
											"Masculino"
											  ), 
                                              (
											"F",
											"Feminino"
											  );

create table tbl_nacionalidade (
id int not null auto_increment primary key,
nome varchar (20) not null
);

insert into tbl_nacionalidade	(
								nome
								) values
                                (
                                "Francês"
                                ),
                                (
                                "Brasileiro"
                                ),
                                (
                                "Americano"
                                ),
                                (
                                "Africano"
                                ),
                                (
                                "Inglês"
                                ),
                                (
                                "Alemão"
                                );
                                
create table tbl_nacionalidade_ator(
	id int not null auto_increment primary key,
	id_nacionalidade int not null,
    id_ator int not null,
    
    constraint FK_NACIONALIDADE_NACIONALIDADEATOR
    foreign key(id_nacionalidade)
    references tbl_nacionalidade(id),
    
    constraint FK_ATOR_NACIONALIDADEATOR
    foreign key(id_ator)
    references tbl_atores(id)
);

drop table tbl_nacionalidade_ator;

insert into tbl_nacionalidade_ator(
									id_nacionalidade,
									id_ator
									) values(
									1, 1
									),
                                    (
                                    1, 2
									),
                                    (
									2, 1
									),
                                    (
									2, 2
									);
                                    
                                    
                                    

create table tbl_diretores (
id int not null auto_increment primary key,
nome varchar(80) not null,
data_nascimento date not null,
foto varchar(255) not null,
data_falecimento date,
biografia text,
id_nacionalidade int not null,

foreign key (id_nacionalidade) references tbl_nacionalidade(id)

);
drop table tbl_diretores;

insert into tbl_diretores (
                            nome,
                            data_nascimento,
                            foto,
                            data_falecimento,
                            biografia,
                            id_nacionalidade
                            )values (
                            'Justin Lin',
                            '1971-10-11',
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQc3hSRMesfeyyrkaIJkg1dmoWcUF00bjUbF3Cv7mfIg&s',
                            null,
                            'Justin Lin é um diretor, roteirista e produtor de cinema taiwanês-americano, conhecido por dirigir Better Luck Tomorrow e cinco filmes da série The Fast and the Furious.Nasceu em Taipei e cresceu em Orange County, Califórnia. Frequentou a Universidade da Califórnia, em San Diego, durante dois anos',
                            1
                            ),
                            (
                            'Francis Lawrence',
                            '1971-03-26',
                            'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTxOOv_-RRminOLpxWgXHs6O2eKWvvMICXsu5HhdSgG0rcCVuLKT6FxNpAYWnuFXAf9',
                            null,
                            'Francis Lawrence é um cineasta austríaco naturalizado americano. Antes de estrear como diretor de cinema, Lawrence era conhecido apenas por dirigir
                            alguns videoclipes ',
                            1
                            );
                           
                                    
create table tbl_nacionalidade_diretor(
	id int not null auto_increment primary key,
	id_nacionalidade int not null,
    id_diretor int not null,
    
	constraint FK_NACIONALIDADE_NACIONALIDADEDIRETOR
    foreign key(id_nacionalidade)
    references tbl_nacionalidade(id),
    
	constraint FK_DIRETOR_NACIONALIDADEDIRETOR
    foreign key(id_diretor)
    references tbl_diretores(id)
    
);
drop table tbl_nacionalidade_diretor;

insert into tbl_nacionalidade_diretor(
									id_nacionalidade,
                                    id_diretor
								   ) values
                                   (
                                   2, 1
                                   ),
                                   (
                                   2,2
                                   );

                                    
	
                                    
create table tbl_classificacao_filme(
	id int not null auto_increment primary key,
    id_classificacao int not null,
    id_filme int not null,
    
     foreign key(id_classificacao)
    references tbl_classificacao(id)
    );
    
insert into tbl_classificacao_filme(
									id_classificacao,
                                    id_filme
                                    ) values
                                    (
                                    2, 1
                                    ),
                                    (
                                    5, 2
                                    );
                                    
drop table tbl_classificacao_filme;

create table tbl_genero_filme(
	id int not null auto_increment primary key,
	id_genero int not null,
    id_filme int not null,
    
	foreign key(id_genero)
    references tbl_genero(id)
    
);
drop table tbl_genero_filme;

insert into tbl_genero_filme(
							id_genero,
                            id_filme
                            ) values
                            (
                            1, 1
                            ),
                            (
                            2, 7
                            );

									  
								

create table tbl_genero(
id int not null auto_increment primary key,
nome varchar(50)
);
select * from tbl_genero;

drop table tbl_genero;

delete from tbl_genero where id = 11;

insert into tbl_genero(
						nome
					   )values(
                       "Ação"
                       ),
                       (
                       "Romance"
                       ),
                       (
                       "Drama"
                       ),
                       (
                       "Terror" 
                       ),
                       (
                       "Suspense"
                       ),
                       (
                       "Comédia"
                       ),
                       (
                       "Ficção"
                       );
                           
create table tbl_classificacao (
	id int not null auto_increment primary key,
    categoria varchar(80) not null,
    descricao text,
    simbolo text not null,
    unique index (id),
    unique key (id)
);
drop table tbl_classificacao;

select * from tbl_classificacao;

insert into tbl_classificacao ( categoria,
								descricao,
                                simbolo
								) values (
								'Livre para todos oos públicos',
                                'Histórias sem coteúdos potencialmente prejudiciais para qualquer faixa etária.',
                                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAXVBMVEUAr1H///8ApjTM6dUAqUCY1asArk4Aq0S/5s0qslj1+/d1yZEApC3X7+Ce2LKT1KlewoFpxom548havnZ2xovu+fLn9exrwoKHzput3b04tmJ7y5YAoBrF6NJFu2/vY2uQAAACP0lEQVR4nO3d0ZKaMBSA4QQ0KAu42pWuu7Xv/5gNy0Uvmm6X5giHw/873kq+ScLADKrzsfZb5VZd9XIdHC6++++7pUeT2+61HjH1qVh6LPlVtxFzD2HpoeRXvbUDpj6vfpENFfs6YkoTFheO14h5t4FxxSFiLOyYoersXd8sPQqhQuXdxcB5eazpXWdky0RM6/ZmMEVpCXO3hDlYwphaZmCUBkZrYLQGRmtgtAZGa2C0BkZrYLQGRmtgtAZGa2C0BkZrYLQGRmtgPi38TvRzvxAz85fCe9ftu0Snt3kmSRATXOnT1c/zPAEKJh0Y0cCk2wrmDGZyYNJtBfMEZnLzYF7WhwmWMKZmZiN7Bsz0wKQDIxqYdGBEA5MOjGhg0oERDUw6MKKZwwgdCYxoYNKBEQ1MOjCigUkHRjQw6cCIBiYdGNHM3WmC+TMwooFJt5UnNMBMjz2TbiszYwrDMpsemHQsM9HApNsKxtSeMYV5/tF8XjGWaZ4F4/v2H5VD90vmV1PmwXyx+pQ3FDAPw2QOBQwYMGDAgAEDBowgxtKFptczM87tD//d5aPM22tRzDG3zOOLYkJumcfnV7S0BkZrYLQGRmvWMJmXqooCozUwWgOjNTBaA6M1MFoDozUwWgOjNTBaA6M1MFoDozUwWouYzgymad2hWHoQUjW165ulByFUcD6+Zv9Dsse0e4oYK2eAooyYdp6v6jy66uc1YupXE1NTXHzE+PZoYNfsztcPjL+tf2rC8e5HzPrPASHcBscv0W4yhaAjDVsAAAAASUVORK5CYII='
								),(
								'Não recomendado para menores de 10 anos',
                                'Histórias de conteúdo violento e linguagem imprópria de nível leve.',
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/1024px-DJCTQ_-_10.svg.png'
								),
                                (
                                'Não recomendado para menores de 12 anos',
                                'Histórias com cena de agressão física, insinuação de consumoo de drogas e insinuação leve de sexo.',
                                'https://www.google.com/url?sa=i&url=https%3A%2F%2Flogodownload.org%2Fclassificacao-12-anos-logo%2F&psig=AOvVaw3CbU4x6PGjoKIx5cQ0lz2A&ust=1711550636479000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC4_Y6VkoUDFQAAAAAdAAAAABAE'
                                ),
                                (
                                'Não recomendado para menores de 14 anos',
                                'Histórias com agressão física média, consumo de drogas explícito e insinuação de sexo moderada.',
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/1200px-DJCTQ_-_14.svg.png'
                                ),
                                (
                                'Não recomendado para menores de 16 anos',
                                'Histórias com consumo de drogas explícito, agressão física acentuada e insinuação de sexo acentuada.',
                                'https://www.google.com/url?sa=i&url=https%3A%2F%2Flogodownload.org%2Fclassificacao-16-anos-logo%2F&psig=AOvVaw3CbU4x6PGjoKIx5cQ0lz2A&ust=1711550636479000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC4_Y6VkoUDFQAAAAAdAAAAABAI'
                                ),
                                (
                                'Não recomendado para menores de 18 anos',
                                'Histórias com consumo e indução ao consumo de drogas, violência extrema, suicídio, cenas de sexo explícitas e distúrbios psicossomáticos.',
                                'data:image/png;base64,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'
                                );


select * from tbl_filme where nome like 'Eu sou%';

show tables;

select * from tbl_atores;

desc tbl_atores;
                   
select * from tbl_filme;

select * from tbl_classificacao;

drop table tbl_filme;

select * from tbl_atores where id = 1;

select last_insert_id() from tbl_atores limit 1;

 DELETE FROM tbl_filme WHERE id = 28;

select CAST(last_insert_id() as DECIMAL) as id from tbl_filme limit 1;
drop table tbl_filme;

desc tbl_filme;                    

show tables;