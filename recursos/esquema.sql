--
-- PostgreSQL database dump
--

-- Dumped from database version 12.20
-- Dumped by pg_dump version 12.20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pruebatecnica; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pruebatecnica;


ALTER SCHEMA pruebatecnica OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asistencia; Type: TABLE; Schema: pruebatecnica; Owner: postgres
--

CREATE TABLE pruebatecnica.asistencia (
    asistencia_id integer NOT NULL,
    evento_id integer NOT NULL,
    usuario_id integer NOT NULL,
    fecha timestamp without time zone NOT NULL
);


ALTER TABLE pruebatecnica.asistencia OWNER TO postgres;

--
-- Name: asistencia_asistencia_id_seq; Type: SEQUENCE; Schema: pruebatecnica; Owner: postgres
--

CREATE SEQUENCE pruebatecnica.asistencia_asistencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pruebatecnica.asistencia_asistencia_id_seq OWNER TO postgres;

--
-- Name: asistencia_asistencia_id_seq; Type: SEQUENCE OWNED BY; Schema: pruebatecnica; Owner: postgres
--

ALTER SEQUENCE pruebatecnica.asistencia_asistencia_id_seq OWNED BY pruebatecnica.asistencia.asistencia_id;


--
-- Name: eventos; Type: TABLE; Schema: pruebatecnica; Owner: postgres
--

CREATE TABLE pruebatecnica.eventos (
    evento_id integer NOT NULL,
    usuario_id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    descripcion character varying(255) NOT NULL,
    creado_por timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    locacion character varying(45) NOT NULL,
    asistencia integer DEFAULT 0 NOT NULL,
    fecha_evento timestamp without time zone NOT NULL
);


ALTER TABLE pruebatecnica.eventos OWNER TO postgres;

--
-- Name: eventos_evento_id_seq; Type: SEQUENCE; Schema: pruebatecnica; Owner: postgres
--

CREATE SEQUENCE pruebatecnica.eventos_evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pruebatecnica.eventos_evento_id_seq OWNER TO postgres;

--
-- Name: eventos_evento_id_seq; Type: SEQUENCE OWNED BY; Schema: pruebatecnica; Owner: postgres
--

ALTER SEQUENCE pruebatecnica.eventos_evento_id_seq OWNED BY pruebatecnica.eventos.evento_id;


--
-- Name: usuarios; Type: TABLE; Schema: pruebatecnica; Owner: postgres
--

CREATE TABLE pruebatecnica.usuarios (
    usuario_id integer NOT NULL,
    correo character varying(100) NOT NULL,
    nombre character varying(45) NOT NULL,
    contrasena character varying(200) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE pruebatecnica.usuarios OWNER TO postgres;

--
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE; Schema: pruebatecnica; Owner: postgres
--

CREATE SEQUENCE pruebatecnica.usuarios_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pruebatecnica.usuarios_usuario_id_seq OWNER TO postgres;

--
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: pruebatecnica; Owner: postgres
--

ALTER SEQUENCE pruebatecnica.usuarios_usuario_id_seq OWNED BY pruebatecnica.usuarios.usuario_id;


--
-- Name: asistencia asistencia_id; Type: DEFAULT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.asistencia ALTER COLUMN asistencia_id SET DEFAULT nextval('pruebatecnica.asistencia_asistencia_id_seq'::regclass);


--
-- Name: eventos evento_id; Type: DEFAULT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.eventos ALTER COLUMN evento_id SET DEFAULT nextval('pruebatecnica.eventos_evento_id_seq'::regclass);


--
-- Name: usuarios usuario_id; Type: DEFAULT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.usuarios ALTER COLUMN usuario_id SET DEFAULT nextval('pruebatecnica.usuarios_usuario_id_seq'::regclass);


--
-- Name: asistencia asistencia_pkey; Type: CONSTRAINT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.asistencia
    ADD CONSTRAINT asistencia_pkey PRIMARY KEY (asistencia_id);


--
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (evento_id);


--
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id);


--
-- Name: eventos eventos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.eventos
    ADD CONSTRAINT eventos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES pruebatecnica.usuarios(usuario_id);


--
-- Name: asistencia fk_evento_asistencia; Type: FK CONSTRAINT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.asistencia
    ADD CONSTRAINT fk_evento_asistencia FOREIGN KEY (evento_id) REFERENCES pruebatecnica.eventos(evento_id) ON DELETE CASCADE;


--
-- Name: asistencia fk_usuario_asistencia; Type: FK CONSTRAINT; Schema: pruebatecnica; Owner: postgres
--

ALTER TABLE ONLY pruebatecnica.asistencia
    ADD CONSTRAINT fk_usuario_asistencia FOREIGN KEY (usuario_id) REFERENCES pruebatecnica.usuarios(usuario_id);


--
-- PostgreSQL database dump complete
--

