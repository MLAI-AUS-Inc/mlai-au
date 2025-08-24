import { Card, CardContent } from "./ui/Card";
import { Container } from "./ui/Container";

const featuredTestimonial = {
  body: "As excitement about AI builds and the impacts spread into all our daily lives, a strong and diverse community of participants is vital to support positive outcomes for all. It's great to see the MLAI Aus crew working hard to build this community across Australia. Get off the couch and get involved!",
  author: {
    name: "Kendra Vant",
    handle: "Director - Europalabs",
    imageUrl: "photos/kendra.png",
    logoUrl: "",
  },
};
const testimonials: any = [
  [
    [
      {
        body: "It was an absolute pleasure to work with the MLAI team on the Ecosystem Drinks: Talent meets Startups. It was amazing to see so many engaging members of the MLAI community join in for the startup speed dating. ",
        author: {
          name: "Eike Zeller",
          handle: "Ecosystems Director - Stone & Chalk",
          imageUrl: "photos/eikezeller.jpg",
        },
      },
    ],

    [
      {
        body: "MLAI has been a fantastic community for connecting with like-minded, talented people. Everyone has been warm, welcoming, and eager to talk nitty-gritty tech details.",
        author: {
          name: "Xavier Andueza",
          handle: "Founding AI Engineer - Userdoc",
          imageUrl: "photos/xavierandueza.jpg",
        },
      },
    ],
  ],
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Testimonals() {
  return (
    <div className="relative isolate bg-white py-16 sm:py-24">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#81E6D9] to-[#E5E7EB]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#81E6D9] to-[#E5E7EB] xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-teal-500">
            &quot;Honestly, meeting cool people was the best part of it
            all&quot;
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We are proud to have worked with amazing people
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <Card
            variant="elevated"
            as="figure"
            className="sm:col-span-2 xl:col-start-2 xl:row-end-1"
          >
            <CardContent className="sm:p-12">
              <blockquote className="text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:text-xl sm:leading-8">
                <p>{`"${featuredTestimonial.body}"`}</p>
              </blockquote>
            </CardContent>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <img
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={featuredTestimonial.author.imageUrl}
                alt=""
              />
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-gray-600">{`${featuredTestimonial.author.handle}`}</div>
              </div>
              <img
                className="h-10 w-auto flex-none"
                src={featuredTestimonial.author.logoUrl}
                alt=""
              />
            </figcaption>
          </Card>
          {testimonials.map((columnGroup: any, columnGroupIdx: any) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column: any, columnIdx: any) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8",
                  )}
                >
                  {column.map((testimonial: any) => (
                    <Card
                      key={testimonial.author.handle}
                      variant="testimonial"
                      as="figure"
                    >
                      <CardContent>
                        <blockquote className="text-gray-900">
                          <p>{`"${testimonial.body}"`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <img
                            className="h-10 w-10 rounded-full bg-gray-50"
                            src={testimonial.author.imageUrl}
                            alt=""
                          />
                          <div>
                            <div className="font-semibold">
                              {testimonial.author.name}
                            </div>
                            <div className="text-gray-600">{`${testimonial.author.handle}`}</div>
                          </div>
                        </figcaption>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
