export const settingsQuery = `*[_type == "siteSettings"][0]{..., "logo": logo{..., asset->}, "alternateLogo": alternateLogo{..., asset->}, "defaultOgImage": defaultOgImage{..., asset->}}`;
export const servicesQuery = `*[_type == "service" && active == true] | order(order asc, name asc){..., "slug": slug.current, image{..., asset->}}`;
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(manualOrder asc, projectDate desc)[0...6]{..., "slug": slug.current, coverImage{..., asset->}, category->{_id,name,"slug":slug.current}, services[]->{_id,name,"slug":slug.current}}`;
export const projectsQuery = `*[_type == "project"] | order(manualOrder asc, projectDate desc){..., "slug": slug.current, coverImage{..., asset->}, category->{_id,name,"slug":slug.current}, services[]->{_id,name,"slug":slug.current}}`;
export const categoriesQuery = `*[_type == "category"] | order(name asc){_id,name,"slug":slug.current,description}`;
export const projectSlugsQuery = `*[_type == "project" && defined(slug.current)]{"slug":slug.current}`;
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{..., "slug":slug.current, coverImage{..., asset->}, gallery[]{...,asset->}, ogImage{...,asset->}, category->{_id,name,"slug":slug.current}, services[]->{_id,name,"slug":slug.current}}`;
export const relatedProjectsQuery = `*[_type == "project" && slug.current != $slug && category._ref == $categoryId] | order(projectDate desc)[0...3]{..., "slug":slug.current, coverImage{...,asset->}, category->{_id,name,"slug":slug.current}}`;
