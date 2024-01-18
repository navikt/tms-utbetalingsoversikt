import useSWRImmutable from "swr/immutable";
import ContentLoader from "../contentLoader/ContentLoader";
import { authAndRedirectUrl, authenticationUrl, baseUrl, loginUrl } from "~utils/urls.ts";
import { fetcher } from "../../api/api.ts";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const redirectToIdPorten = () => {
  window.location.assign(authAndRedirectUrl());
};

const Authentication = ({ children }: Props) => {
  const { data, isLoading, error } = useSWRImmutable(
    { path: authenticationUrl },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  if (isLoading) {
    return <ContentLoader />;
  }

  if(!data?.authenticated || error){
    redirectToIdPorten();
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default Authentication;
