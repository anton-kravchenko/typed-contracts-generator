const c = isObject({
  results: isArray((valueName, value) =>
    isObject({
      episodes: isArray((valueName, value) =>
        isObject({
          network_id: isUnion(isNumber, isString),
        })(valueName, value),
      ),
      franchise_id: isNumber,
      is_locked: isBoolean,
    })(valueName, value),
  ),
  network_results: isNull,
  count: isNumber,
  exception: isNull,
  onlinenow: isObject({
    content: isArray((valueName, value) =>
      isObject({
        a: isUnion(isNumber, isBoolean),
        thumbnailUrl: isString,
      })(valueName, value),
    ),
    params: isObject({
      baseimgurl: isString,
      genre: isNull,
      id: isUnion(isNumber, isString),
      itemStart: isNumber,
      rating: isNull,
      sort: isString,
      subscribed: isNull,
      totalItems: isNumber,
      totalcount: isNumber,
    }),
    parental_control_settings: isObject({
      show_ratings_to_block: isNull,
      block_unrated_shows: isBoolean,
      block_unrated_movies: isBoolean,
      movie_ratings_to_block: isNull,
      pc_code: isNull,
      pc_enabled: isNull,
    }),
  }),
  details: isObject({
    genres: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
  }),
})('');
