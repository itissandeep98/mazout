// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require("@layer0/core/router");
const { nextRoutes } = require("@layer0/next");

const foreverEdge = {
	browser: {
		maxAgeSeconds: 0,
		serviceWorkerSeconds: 60 * 60 * 24,
	},
	edge: {
		staleWhileRevalidateSeconds: 1,
		maxAgeSeconds: 60 * 60 * 60 * 365,
	},
};

let prerenderPages = ["/", "/home"];

module.exports = new Router()
	.prerender(prerenderPages.map((page) => ({ path: page })))
	.match("/_next/static/:path*", ({ cache, removeUpstreamResponseHeader }) => {
		removeUpstreamResponseHeader("set-cookie");
		removeUpstreamResponseHeader("cache-control");
		cache(foreverEdge);
	})
	.match("/_next/image/:path*", ({ cache, removeUpstreamResponseHeader }) => {
		removeUpstreamResponseHeader("set-cookie");
		removeUpstreamResponseHeader("cache-control");
		cache(foreverEdge);
	})
	.match("/service-worker.js", ({ serviceWorker }) => {
		return serviceWorker(".next/static/service-worker.js");
	})
	.use(nextRoutes); // automatically adds routes for all files under /pages
