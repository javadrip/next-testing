export type Headings = {
  headings: [
    {
      _key: string;
      _type: string;
      style: string;
      children: [
        {
          _key: string;
          _type: string;
          marks: string[];
          text: string;
        }
      ];
      markDefs: [
        {
          _key: string;
          _type: string;
          slug: {
            _type: string;
            current: string;
          };
        }
      ];
    }
  ];
};
