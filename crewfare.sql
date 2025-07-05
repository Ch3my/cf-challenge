--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-05 17:12:25

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

--
-- TOC entry 3370 (class 0 OID 16389)
-- Dependencies: 217
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (booking_id, hotel_id, event_id, guest_name, guest_phone_number, check_in_date, check_out_date) FROM stdin;
1	101	1	John Doe	1234567890	2025-09-01 00:00:00	2025-09-05 00:00:00
2	101	1	Alice Smith	2345678901	2025-09-02 00:00:00	2025-09-06 00:00:00
3	101	1	Bob Johnson	3456789012	2025-09-03 00:00:00	2025-09-07 01:00:00
4	101	1	Sarah Lee	4567890123	2025-09-05 00:00:00	2025-09-10 00:00:00
5	101	1	David Brown	5678901234	2025-09-06 00:00:00	2025-09-11 00:00:00
6	101	1	Emily White	6789012345	2025-09-07 01:00:00	2025-09-12 00:00:00
7	101	1	Michael Black	7890123456	2025-09-08 00:00:00	2025-09-13 00:00:00
8	101	2	Lisa Green	8901234567	2025-09-15 00:00:00	2025-09-20 00:00:00
9	101	2	Paul Gray	9012345678	2025-09-16 00:00:00	2025-09-21 00:00:00
10	101	2	Tom Harris	0123456789	2025-09-25 00:00:00	2025-09-30 00:00:00
11	101	2	Anna Clark	1234567890	2025-09-26 00:00:00	2025-09-30 00:00:00
12	101	2	George King	2345678901	2025-10-01 00:00:00	2025-10-05 00:00:00
13	101	2	Jessica Allen	3456789012	2025-10-02 00:00:00	2025-10-06 00:00:00
14	101	2	Gilliam King	3456789012	2025-10-02 00:00:00	2025-10-06 00:00:00
15	101	2	Natalia Fernandez	(805) 440-2313	2025-04-02 00:00:00	2025-05-20 00:00:00
16	101	2	Campbell Raymond	(910) 581-3774	2025-04-15 00:00:00	2025-05-13 00:00:00
17	101	2	Rhodes Charles	(882) 559-2902	2025-04-12 00:00:00	2025-05-17 00:00:00
18	101	2	Mejia Ferguson	(842) 592-3410	2025-03-25 00:00:00	2025-05-10 00:00:00
19	101	2	Dominique Ayers	(805) 546-3313	2025-04-03 00:00:00	2025-05-11 00:00:00
\.


--
-- TOC entry 3371 (class 0 OID 16393)
-- Dependencies: 218
-- Data for Name: rooming_list_bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooming_list_bookings (rooming_list_booking_id, rooming_list_id, booking_id) FROM stdin;
191	1	1
192	1	2
193	1	3
194	2	4
195	2	5
196	3	6
197	3	7
198	4	8
199	4	9
200	5	10
201	5	11
202	6	12
203	6	13
204	7	14
205	7	15
206	7	16
207	8	17
208	8	18
209	8	19
\.


--
-- TOC entry 3373 (class 0 OID 16397)
-- Dependencies: 220
-- Data for Name: rooming_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooming_lists (rooming_list_id, event_id, hotel_id, rfp_name, cut_off_date, status, agreement_type, event_name) FROM stdin;
1	1	101	ACL-2025	2025-09-30 00:00:00	completed	leisure	Rolling Loud
2	1	101	ACL-2025	2025-09-30 00:00:00	received	staff	Rolling Loud
3	1	101	ACL-2024	2024-09-30 00:00:00	archived	leisure	Rolling Loud
4	2	101	RLM-2025	2025-09-30 00:00:00	completed	leisure	Ultra Miami
5	2	101	RLM-2025	2025-10-15 00:00:00	completed	staff	Ultra Miami
6	2	101	RLM-2025	2025-10-15 00:00:00	Confirmed	leisure	Ultra Miami
7	2	101	RLM-2026	2026-10-25 00:00:00	received	leisure	Ultra Miami
8	2	101	RLM-2026	2026-10-25 00:00:00	received	staff	Ultra Miami
\.


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 219
-- Name: rooming_list_bookings_rooming_list_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooming_list_bookings_rooming_list_booking_id_seq', 209, true);


-- Completed on 2025-07-05 17:12:25

--
-- PostgreSQL database dump complete
--

