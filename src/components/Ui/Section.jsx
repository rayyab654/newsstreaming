import Container from "./Container";

export default function Section({
  title,
  children,
}) {
  return (
    <section className="py-10">

      <Container>

        {title && (
          <h2 className="mb-6 text-3xl font-black">
            {title}
          </h2>
        )}

        {children}

      </Container>

    </section>
  );
}
