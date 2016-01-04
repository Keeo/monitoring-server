USE `monitoring`;

INSERT INTO `user` (`id`, `email`, `password`, `hash`) VALUES
('1', 'test@email.com', 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', 'user-secret-hash-1');

INSERT INTO `node` (`id`, `hash`, `name`, `user`) VALUES
('1', 'node-secret-hash-1', 'karel', '1'),
('2', 'node-secret-hash-2', 'lukas', '1');

INSERT INTO `log` (`id`, `severity`, `message`, `context`, `created`, `node`) VALUES
('1', 'info', 'test log message', NULL, CURRENT_TIMESTAMP, '1'),
('2', 'debug', 'debug log message', NULL, '2016-01-12 00:00:00', '1');
