CREATE DATABASE IF NOT EXISTS powerplay;
USE powerplay;

DROP TABLE IF EXISTS item_pedido;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS produto;

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao VARCHAR(255),
    categoria VARCHAR(60) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(150),
    estoque INT NOT NULL DEFAULT 0,
    pagina VARCHAR(80)
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    endereco VARCHAR(200) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    pagamento VARCHAR(30) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pedido_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE item_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_item_pedido
        FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    CONSTRAINT fk_item_produto
        FOREIGN KEY (produto_id) REFERENCES produto(id)
);

INSERT INTO produto
(nome, descricao, categoria, preco, imagem, estoque, pagina)
VALUES
('Manto Alvinegro', 'Camiseta esportiva Corinthians', 'Blusas', 159.90, 'cor1.jpeg', 20, 'p1.html'),
('Manto Rubronegro', 'Camiseta esportiva Flamengo', 'Blusas', 249.90, 'fla.jpeg', 20, 'p2.html'),
('Corta Vento Barcelona', 'Jaqueta corta vento Barcelona', 'Casacos', 359.50, 'barcelona.jpeg', 15, 'p3.html'),
('Tenis AirJordan', 'Tênis esportivo AirJordan', 'Tênis', 659.90, 'airmax.jpeg', 12, 'p4.html'),
('Camiseta Real Madrid', 'Camiseta esportiva Real Madrid', 'Blusas', 370.00, 'real.jpeg', 15, 'p5.html'),
('Garrafa Térmica', 'Garrafa térmica esportiva', 'Acessórios', 29.90, 'garrafa.jpeg', 30, 'p6.html'),
('Chuteira Special Lionel Messi', 'Chuteira edição especial', 'Tênis', 1159.90, 'chuteiramessi.jpeg', 8, 'p7.html'),
('Tênis Edição Especial', 'Tênis esportivo edição especial', 'Tênis', 550.90, 'tenisfogo.jpg', 10, 'p8.html'),
('Kit Raquete Tenis', 'Kit com raquetes para tênis', 'Acessórios', 359.90, 'kittenis.jpg', 10, 'p9.html'),
('Bola da Copa 2010', 'Bola Jabulani', 'Acessórios', 59.90, 'jabulani.jpg', 20, 'p10.html'),
('Corta Vento PSG', 'Jaqueta corta vento PSG', 'Casacos', 199.99, 'psg.jpeg', 15, 'p11.html'),
('Blusa Térmica', 'Blusa térmica masculina e feminina', 'Blusas', 99.90, 'termica.jpg', 25, 'p12.html');

INSERT INTO usuario (nome, email, senha)
VALUES ('Cliente PowerPlay', 'cliente@powerplay.com', '123456');
