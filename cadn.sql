-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 17 déc. 2021 à 10:49
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET
  time_zone = "+00:00";
  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!40101 SET NAMES utf8mb4 */;
--
  -- Base de données : `cadn`
  --
  -- --------------------------------------------------------
  --
  -- Structure de la table `about`
  --
  CREATE TABLE `about` (
    `id` int(11) NOT NULL,
    `fullname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `description` text NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
  --
  -- Structure de la table `article`
  --
  CREATE TABLE `article` (
    `id` int(11) NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `image` varchar(255) NOT NULL,
    `date` date NOT NULL,
    `id_category` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
  --
  -- Structure de la table `category`
  --
  CREATE TABLE `category` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `description` text NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
--
  -- Déchargement des données de la table `category`
  --
INSERT INTO
  `category` (`id`, `name`, `image`, `description`)
VALUES
  (1, 'Naturopathie', '', ''),
  (2, 'Nutrition Santé', '', ''),
  (3, 'Diététique Chinoise', '', ''),
  (4, 'Accompagnement Sportif', '', '');
-- --------------------------------------------------------
  --
  -- Structure de la table `contact`
  --
  CREATE TABLE `contact` (
    `id` int(11) NOT NULL,
    `firstname` varchar(255) NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `message` text NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
  --
  -- Structure de la table `event`
  --
  CREATE TABLE `event` (
    `id` int(11) NOT NULL,
    `title` varchar(255) NOT NULL,
    `date` datetime NOT NULL,
    `description` text NOT NULL,
    `id_category` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
  --
  -- Structure de la table `recipe`
  --
  CREATE TABLE `recipe` (
    `id` int(11) NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `person` int(11) NOT NULL,
    `time` int(11) NOT NULL,
    `ingredients` text NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
  --
  -- Structure de la table `service`
  --
  CREATE TABLE `service` (
    `id` int(11) NOT NULL,
    `price` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `time` int(11) NOT NULL,
    `description` text NOT NULL,
    `image` varchar(255) NOT NULL,
    `id_category` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
  --
  -- Structure de la table `social`
  --
  CREATE TABLE `social` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `url` varchar(255) NOT NULL,
    `icon` varchar(255) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- --------------------------------------------------------
  --
  -- Structure de la table `user`
  --
  CREATE TABLE `user` (
    `id` int(11) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `is_admin` tinyint(4) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
--
  -- Index pour les tables déchargées
  --
  --
  -- Index pour la table `about`
  --
ALTER TABLE
  `about`
ADD
  PRIMARY KEY (`id`);
--
  -- Index pour la table `article`
  --
ALTER TABLE
  `article`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `article_category` (`id_category`);
--
  -- Index pour la table `category`
  --
ALTER TABLE
  `category`
ADD
  PRIMARY KEY (`id`);
--
  -- Index pour la table `contact`
  --
ALTER TABLE
  `contact`
ADD
  PRIMARY KEY (`id`);
--
  -- Index pour la table `event`
  --
ALTER TABLE
  `event`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `event_category` (`id_category`);
--
  -- Index pour la table `recipe`
  --
ALTER TABLE
  `recipe`
ADD
  PRIMARY KEY (`id`);
--
  -- Index pour la table `service`
  --
ALTER TABLE
  `service`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `service_category` (`id_category`);
--
  -- Index pour la table `social`
  --
ALTER TABLE
  `social`
ADD
  PRIMARY KEY (`id`);
--
  -- Index pour la table `user`
  --
ALTER TABLE
  `user`
ADD
  PRIMARY KEY (`id`);
--
  -- AUTO_INCREMENT pour les tables déchargées
  --
  --
  -- AUTO_INCREMENT pour la table `about`
  --
ALTER TABLE
  `about`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT pour la table `article`
  --
ALTER TABLE
  `article`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT pour la table `category`
  --
ALTER TABLE
  `category`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 5;
--
  -- AUTO_INCREMENT pour la table `contact`
  --
ALTER TABLE
  `contact`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT pour la table `event`
  --
ALTER TABLE
  `event`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT pour la table `recipe`
  --
ALTER TABLE
  `recipe`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT pour la table `service`
  --
ALTER TABLE
  `service`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT pour la table `social`
  --
ALTER TABLE
  `social`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT pour la table `user`
  --
ALTER TABLE
  `user`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- Contraintes pour les tables déchargées
  --
  --
  -- Contraintes pour la table `article`
  --
ALTER TABLE
  `article`
ADD
  CONSTRAINT `article_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);
--
  -- Contraintes pour la table `event`
  --
ALTER TABLE
  `event`
ADD
  CONSTRAINT `event_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);
--
  -- Contraintes pour la table `service`
  --
ALTER TABLE
  `service`
ADD
  CONSTRAINT `service_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);
COMMIT;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;