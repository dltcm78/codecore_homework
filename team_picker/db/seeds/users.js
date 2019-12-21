exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([{
          name: 'Daniel',
          members: 'Daniel,Dohee,Kogi',
          logo: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face-with-heart-eyes.png',
          password: ""
        },
        {
          name: 'Dohee',
          members: 'Daniel,Dohee,Kogi,Panda',
          logo: 'https://i.pinimg.com/originals/03/7e/79/037e79b2fb52127537be79110891ae3f.png',
          password: ""
        },
        {
          name: 'Kogi',
          members: 'Daniel,Dohee,Kogi,Panda,Paduk',
          logo: 'https://i.cbc.ca/1.3504487.1479837941!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/emoji.jpg',
          password: ""
        }
      ]);
    });
};