CREATE TABLE public.contact_messages (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 150),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.contact_messages IS 'Private portfolio enquiries. Server validated writes only; no public read access.';