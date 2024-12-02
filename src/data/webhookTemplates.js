export const webhookTemplates = {
  seoTools: {
    googleSearchConsole: {
      name: 'Google Search Console',
      url: 'https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${accessToken}'
      },
      body: {
        startDate: '${startDate}',
        endDate: '${endDate}',
        dimensions: ['query', 'page', 'device', 'country']
      }
    },
    semrush: {
      name: 'SEMrush Domain Analytics',
      url: 'https://api.semrush.com/analytics/v1/',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ${apiKey}'
      },
      queryParams: {
        domain: '${domain}',
        type: 'domain_ranks'
      }
    },
    ahrefs: {
      name: 'Ahrefs Backlinks',
      url: 'https://api.ahrefs.com/v3/backlinks',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ${apiKey}',
        'Accept': 'application/json'
      },
      queryParams: {
        target: '${domain}',
        mode: 'domain',
        limit: 1000
      }
    },
    moz: {
      name: 'Moz Domain Authority',
      url: 'https://api.moz.com/mozscape/v2/url-metrics',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ${apiKey}',
        'Content-Type': 'application/json'
      },
      body: {
        targets: ['${domain}']
      }
    },
    majestic: {
      name: 'Majestic Site Explorer',
      url: 'https://api.majestic.com/api/json',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ${apiKey}'
      },
      queryParams: {
        cmd: 'GetIndexItemInfo',
        items: 1,
        item0: '${domain}'
      }
    },
    screaming_frog: {
      name: 'Screaming Frog SEO Spider API',
      url: 'https://${domain}:8775/api/v2/crawl',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${apiKey}'
      },
      body: {
        url: '${targetUrl}',
        configuration: {
          maxPages: 1000,
          followExternalNofollow: false,
          ignoreRobotsTxt: false,
          respectNoIndex: true
        }
      }
    },
    google_analytics: {
      name: 'Google Analytics 4',
      url: 'https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${accessToken}',
        'Content-Type': 'application/json'
      },
      body: {
        dateRanges: [{
          startDate: '${startDate}',
          endDate: '${endDate}'
        }],
        dimensions: [
          { name: 'pagePath' },
          { name: 'source' },
          { name: 'medium' }
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'engagedSessions' },
          { name: 'averageSessionDuration' }
        ]
      }
    },
    bing_webmaster: {
      name: 'Bing Webmaster API',
      url: 'https://ssl.bing.com/webmaster/api.svc/json/GetSearchAnalytics',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${apiKey}'
      },
      body: {
        siteUrl: '${siteUrl}',
        startDate: '${startDate}',
        endDate: '${endDate}',
        dimensions: ['Query', 'Page', 'Device', 'Country']
      }
    },
    yandex_webmaster: {
      name: 'Yandex Webmaster API',
      url: 'https://api.webmaster.yandex.net/v4/user/${userId}/hosts/${hostId}/search-queries',
      method: 'GET',
      headers: {
        'Authorization': 'OAuth ${accessToken}'
      },
      queryParams: {
        date_from: '${startDate}',
        date_to: '${endDate}',
        query_indicator: 'TOTAL_CLICKS,TOTAL_SHOWS,AVG_CLICK_POSITION'
      }
    }
  },
  contentAnalysis: {
    openai_analysis: {
      name: 'OpenAI Content Analysis',
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${apiKey}',
        'Content-Type': 'application/json'
      },
      body: {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an SEO content analyzer. Analyze the following content and provide insights on SEO optimization.'
          },
          {
            role: 'user',
            content: '${content}'
          }
        ],
        temperature: 0.7
      }
    },
    clearscope: {
      name: 'Clearscope Content Optimization',
      url: 'https://api.clearscope.io/v1/reports',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${apiKey}',
        'Content-Type': 'application/json'
      },
      body: {
        keyword: '${keyword}',
        content: '${content}',
        country: '${country}'
      }
    },
    surfer_seo: {
      name: 'Surfer SEO Content Editor',
      url: 'https://api.surferseo.com/v1/content-editor',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${apiKey}',
        'Content-Type': 'application/json'
      },
      body: {
        keyword: '${keyword}',
        country: '${country}',
        content: '${content}'
      }
    }
  },
  contentPlatforms: {
    wordpress: {
      name: 'WordPress Post Creation',
      url: 'https://${domain}/wp-json/wp/v2/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${accessToken}'
      },
      body: {
        title: '${title}',
        content: '${content}',
        status: 'draft'
      }
    },
    medium: {
      name: 'Medium Post Creation',
      url: 'https://api.medium.com/v1/users/${userId}/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${accessToken}'
      },
      body: {
        title: '${title}',
        contentFormat: 'html',
        content: '${content}',
        publishStatus: 'draft'
      }
    },
    ghost: {
      name: 'Ghost Post Creation',
      url: 'https://${domain}/ghost/api/v3/admin/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Ghost ${apiKey}'
      },
      body: {
        posts: [{
          title: '${title}',
          html: '${content}',
          status: 'draft'
        }]
      }
    }
  },
  socialMedia: {
    twitter: {
      name: 'Twitter Post Creation',
      url: 'https://api.twitter.com/2/tweets',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${accessToken}',
        'Content-Type': 'application/json'
      },
      body: {
        text: '${content}'
      }
    },
    linkedin: {
      name: 'LinkedIn Post Creation',
      url: 'https://api.linkedin.com/v2/ugcPosts',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${accessToken}',
        'Content-Type': 'application/json'
      },
      body: {
        author: 'urn:li:person:${userId}',
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: '${content}'
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      }
    }
  }
};
