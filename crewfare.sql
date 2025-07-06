--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-06 09:20:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 24576)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    hotel_id integer NOT NULL,
    event_id integer NOT NULL,
    guest_name character varying NOT NULL,
    guest_phone_number character varying NOT NULL,
    check_in_date timestamp without time zone NOT NULL,
    check_out_date timestamp without time zone NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24591)
-- Name: rooming_list_bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooming_list_bookings (
    rooming_list_booking_id integer NOT NULL,
    rooming_list_id integer NOT NULL,
    booking_id integer NOT NULL
);


ALTER TABLE public.rooming_list_bookings OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24590)
-- Name: rooming_list_bookings_rooming_list_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooming_list_bookings_rooming_list_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rooming_list_bookings_rooming_list_booking_id_seq OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 219
-- Name: rooming_list_bookings_rooming_list_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooming_list_bookings_rooming_list_booking_id_seq OWNED BY public.rooming_list_bookings.rooming_list_booking_id;


--
-- TOC entry 218 (class 1259 OID 24583)
-- Name: rooming_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooming_lists (
    rooming_list_id integer NOT NULL,
    event_id integer NOT NULL,
    hotel_id integer NOT NULL,
    rfp_name character varying NOT NULL,
    event_name character varying NOT NULL,
    cut_off_date timestamp without time zone NOT NULL,
    status character varying NOT NULL,
    agreement_type character varying NOT NULL
);


ALTER TABLE public.rooming_lists OWNER TO postgres;

--
-- TOC entry 3218 (class 2604 OID 24594)
-- Name: rooming_list_bookings rooming_list_booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_list_bookings ALTER COLUMN rooming_list_booking_id SET DEFAULT nextval('public.rooming_list_bookings_rooming_list_booking_id_seq'::regclass);


--
-- TOC entry 3370 (class 0 OID 24576)
-- Dependencies: 217
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bookings VALUES (1, 101, 1, 'John Doe', '1234567890', '2025-09-01 00:00:00', '2025-09-05 00:00:00');
INSERT INTO public.bookings VALUES (2, 101, 1, 'Alice Smith', '2345678901', '2025-09-02 00:00:00', '2025-09-06 00:00:00');
INSERT INTO public.bookings VALUES (3, 101, 1, 'Bob Johnson', '3456789012', '2025-09-03 00:00:00', '2025-09-07 00:00:00');
INSERT INTO public.bookings VALUES (4, 101, 1, 'Sarah Lee', '4567890123', '2025-09-05 00:00:00', '2025-09-10 00:00:00');
INSERT INTO public.bookings VALUES (5, 101, 1, 'David Brown', '5678901234', '2025-09-06 00:00:00', '2025-09-11 00:00:00');
INSERT INTO public.bookings VALUES (6, 101, 1, 'Emily White', '6789012345', '2025-09-07 00:00:00', '2025-09-12 00:00:00');
INSERT INTO public.bookings VALUES (7, 101, 1, 'Michael Black', '7890123456', '2025-09-08 00:00:00', '2025-09-13 00:00:00');
INSERT INTO public.bookings VALUES (8, 101, 2, 'Lisa Green', '8901234567', '2025-09-15 00:00:00', '2025-09-20 00:00:00');
INSERT INTO public.bookings VALUES (9, 101, 2, 'Paul Gray', '9012345678', '2025-09-16 00:00:00', '2025-09-21 00:00:00');
INSERT INTO public.bookings VALUES (10, 101, 2, 'Tom Harris', '0123456789', '2025-09-25 00:00:00', '2025-09-30 00:00:00');
INSERT INTO public.bookings VALUES (11, 101, 2, 'Anna Clark', '1234567890', '2025-09-26 00:00:00', '2025-09-30 00:00:00');
INSERT INTO public.bookings VALUES (12, 101, 2, 'George King', '2345678901', '2025-10-01 00:00:00', '2025-10-05 00:00:00');
INSERT INTO public.bookings VALUES (13, 101, 2, 'Jessica Allen', '3456789012', '2025-10-02 00:00:00', '2025-10-06 00:00:00');
INSERT INTO public.bookings VALUES (14, 101, 2, 'Gilliam King', '3456789012', '2025-10-02 00:00:00', '2025-10-06 00:00:00');
INSERT INTO public.bookings VALUES (15, 101, 2, 'Natalia Fernandez', '(805) 440-2313', '2025-04-02 00:00:00', '2025-05-20 00:00:00');
INSERT INTO public.bookings VALUES (16, 101, 2, 'Campbell Raymond', '(910) 581-3774', '2025-04-15 00:00:00', '2025-05-13 00:00:00');
INSERT INTO public.bookings VALUES (17, 101, 2, 'Rhodes Charles', '(882) 559-2902', '2025-04-12 00:00:00', '2025-05-17 00:00:00');
INSERT INTO public.bookings VALUES (18, 101, 2, 'Mejia Ferguson', '(842) 592-3410', '2025-03-25 00:00:00', '2025-05-10 00:00:00');
INSERT INTO public.bookings VALUES (19, 101, 2, 'Dominique Ayers', '(805) 546-3313', '2025-04-03 00:00:00', '2025-05-11 00:00:00');


--
-- TOC entry 3373 (class 0 OID 24591)
-- Dependencies: 220
-- Data for Name: rooming_list_bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rooming_list_bookings VALUES (1, 1, 1);
INSERT INTO public.rooming_list_bookings VALUES (2, 1, 2);
INSERT INTO public.rooming_list_bookings VALUES (3, 1, 3);
INSERT INTO public.rooming_list_bookings VALUES (4, 2, 4);
INSERT INTO public.rooming_list_bookings VALUES (5, 2, 5);
INSERT INTO public.rooming_list_bookings VALUES (6, 3, 6);
INSERT INTO public.rooming_list_bookings VALUES (7, 3, 7);
INSERT INTO public.rooming_list_bookings VALUES (8, 4, 8);
INSERT INTO public.rooming_list_bookings VALUES (9, 4, 9);
INSERT INTO public.rooming_list_bookings VALUES (10, 5, 10);
INSERT INTO public.rooming_list_bookings VALUES (11, 5, 11);
INSERT INTO public.rooming_list_bookings VALUES (12, 6, 12);
INSERT INTO public.rooming_list_bookings VALUES (13, 6, 13);
INSERT INTO public.rooming_list_bookings VALUES (14, 7, 14);
INSERT INTO public.rooming_list_bookings VALUES (15, 7, 15);
INSERT INTO public.rooming_list_bookings VALUES (16, 7, 16);
INSERT INTO public.rooming_list_bookings VALUES (17, 8, 17);
INSERT INTO public.rooming_list_bookings VALUES (18, 8, 18);
INSERT INTO public.rooming_list_bookings VALUES (19, 8, 19);


--
-- TOC entry 3371 (class 0 OID 24583)
-- Dependencies: 218
-- Data for Name: rooming_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rooming_lists VALUES (1, 1, 101, 'ACL-2025', 'Rolling Loud', '2025-09-30 00:00:00', 'completed', 'leisure');
INSERT INTO public.rooming_lists VALUES (2, 1, 101, 'ACL-2025', 'Rolling Loud', '2025-09-30 00:00:00', 'received', 'staff');
INSERT INTO public.rooming_lists VALUES (3, 1, 101, 'ACL-2024', 'Rolling Loud', '2024-09-30 00:00:00', 'archived', 'leisure');
INSERT INTO public.rooming_lists VALUES (4, 2, 101, 'RLM-2025', 'Ultra Miami', '2025-09-30 00:00:00', 'completed', 'leisure');
INSERT INTO public.rooming_lists VALUES (5, 2, 101, 'RLM-2025', 'Ultra Miami', '2025-10-15 00:00:00', 'completed', 'staff');
INSERT INTO public.rooming_lists VALUES (6, 2, 101, 'RLM-2025', 'Ultra Miami', '2025-10-15 00:00:00', 'Confirmed', 'leisure');
INSERT INTO public.rooming_lists VALUES (7, 2, 101, 'RLM-2026', 'Ultra Miami', '2026-10-25 00:00:00', 'received', 'leisure');
INSERT INTO public.rooming_lists VALUES (8, 2, 101, 'RLM-2026', 'Ultra Miami', '2026-10-25 00:00:00', 'received', 'staff');


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 219
-- Name: rooming_list_bookings_rooming_list_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooming_list_bookings_rooming_list_booking_id_seq', 19, true);


--
-- TOC entry 3224 (class 2606 OID 24596)
-- Name: rooming_list_bookings PK_20fb2d40df1ec2d480a773088f4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_list_bookings
    ADD CONSTRAINT "PK_20fb2d40df1ec2d480a773088f4" PRIMARY KEY (rooming_list_booking_id);


--
-- TOC entry 3220 (class 2606 OID 24582)
-- Name: bookings PK_7ff0b5d1ab3fea22169440436f2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "PK_7ff0b5d1ab3fea22169440436f2" PRIMARY KEY (booking_id);


--
-- TOC entry 3222 (class 2606 OID 24589)
-- Name: rooming_lists PK_aaee4e9995b917e49774b45fae5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_lists
    ADD CONSTRAINT "PK_aaee4e9995b917e49774b45fae5" PRIMARY KEY (rooming_list_id);


-- Completed on 2025-07-06 09:20:24

--
-- PostgreSQL database dump complete
--

