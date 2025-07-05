--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-03 14:50:25

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
-- TOC entry 220 (class 1259 OID 16524)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    hotel_id integer NOT NULL,
    event_id integer NOT NULL,
    guest_name character varying(255) NOT NULL,
    guest_phone_number character varying(20),
    check_in_date date NOT NULL,
    check_out_date date NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16523)
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_booking_id_seq OWNER TO postgres;

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 219
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- TOC entry 222 (class 1259 OID 16531)
-- Name: rooming_list_bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooming_list_bookings (
    rooming_list_booking_id integer NOT NULL,
    rooming_list_id integer NOT NULL,
    booking_id integer NOT NULL
);


ALTER TABLE public.rooming_list_bookings OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16530)
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
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 221
-- Name: rooming_list_bookings_rooming_list_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooming_list_bookings_rooming_list_booking_id_seq OWNED BY public.rooming_list_bookings.rooming_list_booking_id;


--
-- TOC entry 218 (class 1259 OID 16515)
-- Name: rooming_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooming_lists (
    rooming_list_id integer NOT NULL,
    event_id integer NOT NULL,
    hotel_id integer NOT NULL,
    rfp_name character varying(255) NOT NULL,
    cut_off_date date NOT NULL,
    status character varying(50) NOT NULL,
    agreement_type character varying(50) NOT NULL,
    CONSTRAINT rooming_lists_agreement_type_check CHECK (((agreement_type)::text = ANY ((ARRAY['leisure'::character varying, 'staff'::character varying, 'artist'::character varying])::text[]))),
    CONSTRAINT rooming_lists_status_check CHECK (((status)::text = ANY ((ARRAY['Active'::character varying, 'Closed'::character varying, 'Cancelled'::character varying])::text[])))
);


ALTER TABLE public.rooming_lists OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16514)
-- Name: rooming_lists_rooming_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooming_lists_rooming_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rooming_lists_rooming_list_id_seq OWNER TO postgres;

--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 217
-- Name: rooming_lists_rooming_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooming_lists_rooming_list_id_seq OWNED BY public.rooming_lists.rooming_list_id;


--
-- TOC entry 3221 (class 2604 OID 16527)
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 16534)
-- Name: rooming_list_bookings rooming_list_booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_list_bookings ALTER COLUMN rooming_list_booking_id SET DEFAULT nextval('public.rooming_list_bookings_rooming_list_booking_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 16518)
-- Name: rooming_lists rooming_list_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_lists ALTER COLUMN rooming_list_id SET DEFAULT nextval('public.rooming_lists_rooming_list_id_seq'::regclass);


--
-- TOC entry 3383 (class 0 OID 16524)
-- Dependencies: 220
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (booking_id, hotel_id, event_id, guest_name, guest_phone_number, check_in_date, check_out_date) FROM stdin;
\.


--
-- TOC entry 3385 (class 0 OID 16531)
-- Dependencies: 222
-- Data for Name: rooming_list_bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooming_list_bookings (rooming_list_booking_id, rooming_list_id, booking_id) FROM stdin;
\.


--
-- TOC entry 3381 (class 0 OID 16515)
-- Dependencies: 218
-- Data for Name: rooming_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooming_lists (rooming_list_id, event_id, hotel_id, rfp_name, cut_off_date, status, agreement_type) FROM stdin;
\.


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 219
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 1, false);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 221
-- Name: rooming_list_bookings_rooming_list_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooming_list_bookings_rooming_list_booking_id_seq', 1, false);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 217
-- Name: rooming_lists_rooming_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooming_lists_rooming_list_id_seq', 1, false);


--
-- TOC entry 3228 (class 2606 OID 16529)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- TOC entry 3230 (class 2606 OID 16536)
-- Name: rooming_list_bookings rooming_list_bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_list_bookings
    ADD CONSTRAINT rooming_list_bookings_pkey PRIMARY KEY (rooming_list_booking_id);


--
-- TOC entry 3232 (class 2606 OID 16538)
-- Name: rooming_list_bookings rooming_list_bookings_rooming_list_id_booking_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_list_bookings
    ADD CONSTRAINT rooming_list_bookings_rooming_list_id_booking_id_key UNIQUE (rooming_list_id, booking_id);


--
-- TOC entry 3226 (class 2606 OID 16522)
-- Name: rooming_lists rooming_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_lists
    ADD CONSTRAINT rooming_lists_pkey PRIMARY KEY (rooming_list_id);


--
-- TOC entry 3233 (class 2606 OID 16544)
-- Name: rooming_list_bookings rooming_list_bookings_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_list_bookings
    ADD CONSTRAINT rooming_list_bookings_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id);


--
-- TOC entry 3234 (class 2606 OID 16539)
-- Name: rooming_list_bookings rooming_list_bookings_rooming_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooming_list_bookings
    ADD CONSTRAINT rooming_list_bookings_rooming_list_id_fkey FOREIGN KEY (rooming_list_id) REFERENCES public.rooming_lists(rooming_list_id);


-- Completed on 2025-07-03 14:50:25

--
-- PostgreSQL database dump complete
--

